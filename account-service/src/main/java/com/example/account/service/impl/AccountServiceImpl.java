package com.example.account.service.impl;

import com.example.account.client.FeignAuthServiceClient;
import com.example.account.exception.ResourceNotFoundException;
import com.example.account.exception.ResourceExistsException;
import com.example.account.model.Account;
import com.example.account.repository.AccountRepository;
import com.example.account.response.AccountResponse;
import com.example.account.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private FeignAuthServiceClient authServiceClient;

    @Override
    public Account getByUserName(String userName) {
        return accountRepository
                .findByName(userName)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("User with username %s not exists", userName)));
    }

    @Override
    public Account getByEmail(String email) {
        return accountRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("User with email %s not exists", email)));
    }

    @Override
    public Account createUser(AccountResponse accountResponse) {
        accountRepository.findByName(accountResponse.getUserName())
                .ifPresent(it -> {
                    throw new ResourceExistsException(String.format("User with username %s already exists", it.getName()));
                });
        accountRepository.findByEmail(accountResponse.getEmail())
                .ifPresent(it -> {
                    throw new ResourceExistsException(String.format("User with email %s already exists", it.getEmail()));
                });
        authServiceClient.createUser(accountResponse);

        Account account = Account.builder()
                .email(accountResponse.getEmail())
                .name(accountResponse.getUserName())
                .build();
        Date createdAt = new Date();

        account.setCreatedAt(createdAt.toInstant());
        account.setUpdatedAt(createdAt.toInstant());
        return accountRepository.save(account);
    }
}
