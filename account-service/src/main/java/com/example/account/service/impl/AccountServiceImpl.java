package com.example.account.service.impl;

import com.example.account.client.FeignAuthServiceClient;
import com.example.account.exception.ResourceNotFoundException;
import com.example.account.exception.ResourceExistsException;
import com.example.account.model.Account;
import com.example.account.repository.AccountRepository;
import com.example.account.response.AccountResponse;
import com.example.account.service.AccountService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class AccountServiceImpl implements AccountService {

  private final AccountRepository repository;
  private final FeignAuthServiceClient client;

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
  public Account createUser(AccountResponse accountResponse) throws ResourceExistsException {
    log.info("create user");
    repository.findByName(accountResponse.getUserName())
      .ifPresent(it -> {
        throw new ResourceExistsException(String.format("User with username %s already exists", accountResponse.getUserName()));
      });
    repository.findByEmail(accountResponse.getEmail())
      .ifPresent(it -> {
        throw new ResourceExistsException(String.format("User with email %s already exists", accountResponse.getEmail()));
      });
    client.createUser(accountResponse);

    Account account = accountResponse.toDto();
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
