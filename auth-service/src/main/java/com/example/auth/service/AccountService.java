package com.example.auth.service;

import com.example.auth.model.Account;
import com.example.auth.response.AccountResponse;

import java.util.List;

@SuppressWarnings("UnusedReturnValue")
public interface AccountService {
    Account createAccount(AccountResponse accountResponse);
    void updateAccount(AccountResponse response);
    List<Account> getUsers();
    void addToAdmin(String userName);
}
