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
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository repository;

    @Autowired
    private FeignAuthServiceClient client;

    @Override
    public Account getByUserName(String userName) {
        return repository
                .findByName(userName)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("User with username %s not exists", userName)));
    }

    @Override
    public Account getByEmail(String email) {
        return repository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("User with email %s not exists", email)));
    }

    @Override
    public List<Account> getUsers() {
        return repository.findAll();
    }

    @Override
    public Account createUser(AccountResponse accountResponse) {
        repository.findByName(accountResponse.getUserName())
                .ifPresent(it -> {
                    throw new ResourceExistsException(String.format("User with username %s already exists", it.getName()));
                });
        repository.findByEmail(accountResponse.getEmail())
                .ifPresent(it -> {
                    throw new ResourceExistsException(String.format("User with email %s already exists", it.getEmail()));
                });
        client.createUser(accountResponse);

        Account account = Account.builder()
                .email(accountResponse.getEmail())
                .name(accountResponse.getUserName())
                .firstName(accountResponse.getFirstName())
                .secondName(accountResponse.getSecondName())
                .build();
        Date createdAt = new Date();

        account.setCreatedAt(createdAt.toInstant());
        account.setUpdatedAt(createdAt.toInstant());
        return repository.save(account);
    }

    @Override
    public void updateUser(AccountResponse response, String prevName) {
        Account prevAccount = repository.findByName(prevName).orElseGet(() -> {
            throw new ResourceNotFoundException(String.format("User with username %s not exists", prevName));
        });
        repository.findByName(response.getUserName())
            .ifPresent(it -> {
                if (!prevName.equals(it.getName())) {
                    throw new ResourceExistsException(String.format("User with username %s already exists", response.getUserName()));
                }
            });
        repository.findByEmail(response.getEmail())
            .ifPresent(it -> {
                if (!prevAccount.getEmail().equals(it.getEmail())) {
                    throw new ResourceExistsException(String.format("User with email %s already exists", response.getEmail()));
                }
            });
        if (prevAccount.isNew(response.getUserName(), response.getEmail())) {
            response.setPrevName(prevName);
            client.updateUser(response);
        }
        Date updatedAt = new Date();
        repository.update(response.getUserName(), response.getEmail(), response.getFirstName(),
            response.getSecondName(), updatedAt.toInstant(), prevName);
    }
}
