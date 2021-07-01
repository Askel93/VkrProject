package com.example.excel.client;

import com.example.excel.response.ListResponse;
import feign.FeignException;
import feign.hystrix.FallbackFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class ShipClientFallback implements FallbackFactory<ShipClient> {
    @Override
    public ShipClient create(Throwable cause) {
        int httpStatus = cause instanceof FeignException ? ((FeignException) cause).status() : 400;
        HttpStatus status = HttpStatus.valueOf(httpStatus);

        return new ShipClient() {
            @Override
            public Object getAllById(ListResponse<Integer> listResponse) {
                throw new ResponseStatusException(status, cause.getMessage());
            }

            @Override
            public Object getAllByOwnOperator(ListResponse<String> listResponse) {
                throw new ResponseStatusException(status, cause.getMessage());
            }
        };
    }
}
