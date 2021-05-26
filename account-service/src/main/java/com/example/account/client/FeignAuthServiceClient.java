package com.example.account.client;

import com.example.account.response.AccountResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.server.ResponseStatusException;

@FeignClient(name = "auth-service", fallbackFactory = AuthServiceFallback.class)
public interface FeignAuthServiceClient {

    @RequestMapping(method = RequestMethod.POST, value = "/uaa/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    void createUser(AccountResponse response);
    @RequestMapping(method = RequestMethod.PUT, value = "/uaa/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    void updateUser(AccountResponse response) throws ResponseStatusException;
}
