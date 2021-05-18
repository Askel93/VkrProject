package com.example.auth.service.impl;

import com.example.auth.model.Account;
import com.example.auth.model.Role;
import com.example.auth.repository.AccountRepository;
import com.example.auth.response.AccountResponse;
import com.example.auth.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service("accountService")
public class AccountServiceImpl implements AccountService, UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public Account createAccount(AccountResponse accountResponse) {
        Account account = Account.builder()
                .email(accountResponse.getEmail())
                .userName(accountResponse.getUserName())
                .build();
        String hash = passwordEncoder.encode(accountResponse.getPassword());
        account.setPassword(hash);
        account.setRoleSet(Set.of(Role.USER));

        return accountRepository.save(account);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> accountOptional = accountRepository.findByUserName(username);
        Account account = accountOptional.orElseThrow(() -> new UsernameNotFoundException("Account with username %s not exists"));
        return new User(account.getUserName(), account.getPassword(), getAuthority(account));
    }

    private Set<SimpleGrantedAuthority> getAuthority(Account user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoleSet().forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_" + role)));
        return authorities;
    }
}
