package com.example.account.service;

import com.example.account.exception.ResourceExistsException;
import com.example.account.exception.ResourceNotFoundException;
import com.example.account.model.Account;
import com.example.account.response.AccountResponse;

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

    /**
     * Save {@link Account} for the given {@link AccountResponse}
     * @param accountResponse must not be {@literal null}
     * @exception ResourceExistsException if User with given {@code userName} already exists
     * @exception com.example.account.exception.ResourceExistsException if User with given {@code email} already exists
     * @return saved {@link Account}
     */
    Account createUser(AccountResponse accountResponse);
}
