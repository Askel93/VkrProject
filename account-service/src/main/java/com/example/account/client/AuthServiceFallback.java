package com.example.account.client;

import com.example.account.response.AccountResponse;
import feign.FeignException;
import feign.hystrix.FallbackFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class AuthServiceFallback implements FallbackFactory<FeignAuthServiceClient> {

    @Override
    public FeignAuthServiceClient create(Throwable cause) {
        int httpStatus = cause instanceof FeignException ? ((FeignException) cause).status() : 400;
        HttpStatus status = HttpStatus.valueOf(httpStatus);

        return new FeignAuthServiceClient() {
            @Override
            public void createUser(AccountResponse response) {
                throw new ResponseStatusException(status, cause.getMessage());
            }

            @Override
            public void updateUser(AccountResponse response) {
                throw new ResponseStatusException(status, cause.getMessage());
            }
        };
    }
}
