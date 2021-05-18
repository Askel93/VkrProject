package com.example.account.client;

import com.example.account.response.AccountResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class AuthServiceFallback implements FeignAuthServiceClient {

    @Override
    public void createUser(AccountResponse accountResponse) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
