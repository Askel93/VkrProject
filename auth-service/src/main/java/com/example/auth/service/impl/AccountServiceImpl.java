package com.example.auth.service.impl;

import com.example.auth.exception.CustomException;
import com.example.auth.model.Account;
import com.example.auth.model.Role;
import com.example.auth.repository.AccountRepository;
import com.example.auth.response.AccountResponse;
import com.example.auth.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service("accountService")
public class AccountServiceImpl implements AccountService, UserDetailsService {

    @Autowired
    private AccountRepository repository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public Account createAccount(AccountResponse accountResponse) {
        Account account = accountResponse.toAccount();
        String hash = encoder.encode(accountResponse.getPassword());
        account.setPassword(hash);
        account.setRoleSet(Set.of(Role.USER));

        return repository.save(account);
    }

    @Override
    public void updateAccount(AccountResponse response) {
        Account prevAccount = repository.findByUserName(response.getPrevName())
            .orElseGet(() -> {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    String.format("User with username %s not exists", response.getUserName()));
            });
        if (!encoder.matches(response.getPassword(), prevAccount.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad password");
        }
        repository.update(response.getUserName(), response.getEmail(), response.getPrevName());
    }

    @Override
    public List<Account> getUsers() {
        return repository.findAll();
    }

    @Override
    public void addToAdmin(String userName) {
        Account account = repository
            .findByUserName(userName)
            .orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Account with username %s not found", userName)));

        if (account.isAdmin()) return;
        account.addRole(Role.ADMIN);
        repository.save(account);
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<Account> accountOptional = repository.findByUserName(username);
        Account account = accountOptional.orElseThrow(() ->
            new CustomException(String.format("Account with username %s not exists", username)));
        return new User(account.getUserName(), account.getPassword(), getAuthority(account));
    }

    private Set<SimpleGrantedAuthority> getAuthority(Account user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoleSet().forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_" + role)));
        return authorities;
    }
}
