package com.example.auth.service;

import com.example.auth.model.Account;
import com.example.auth.response.AccountResponse;

@SuppressWarnings("UnusedReturnValue")
public interface AccountService {
    Account createAccount(AccountResponse accountResponse);
    void updateAccount(AccountResponse response);
}
