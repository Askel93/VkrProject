package com.example.account.service;

import com.example.account.exception.ResourceExistsException;
import com.example.account.exception.ResourceNotFoundException;
import com.example.account.model.Account;
import com.example.account.response.AccountResponse;

import java.util.List;

public interface AccountService {
    /**
     * Retrieve {@link Account} for the given {@code userName}
     * @param userName must not be {@literal null}
     * @exception ResourceNotFoundException if User with given userName not exists
     * @return {@link Account}
     */
    Account getByUserName(String userName);
    /**
     * Retrieve {@link Account} for the given {@code email}
     * @param email must not be {@literal null}
     * @exception com.example.account.exception.ResourceNotFoundException if Account with given email not exists
     * @return {@link Account}
     */
    Account getByEmail(String email);

    List<Account> getUsers();

    /**
     * Save {@link Account} for the given {@link AccountResponse}
     * @param accountResponse must not be {@literal null}
     * @throws ResourceExistsException if User with given {@code userName} or {@code email} already exists
     * @return saved {@link Account}
     */
    Account createUser(AccountResponse accountResponse) throws ResourceExistsException;

    void updateUser(AccountResponse accountResponse, String prevName);
}
