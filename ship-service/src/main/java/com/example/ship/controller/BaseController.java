package com.example.ship.controller;

import com.example.ship.config.View;
import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.response.BaseResponse;
import com.example.ship.service.BaseService;
import com.fasterxml.jackson.annotation.JsonView;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
public class BaseController<T, ID> {
    
    protected BaseService<T, ID> service;
    protected BaseResponse<?, T> response;

    public BaseController(BaseService<T, ID> service, BaseResponse<?, T> response) {
        this.service = service;
        this.response = response;
    }

    @GetMapping("/id")
    @JsonView(View.UI.class)
    @HystrixCommand(fallbackMethod = "getByIdFallback", ignoreExceptions = {ResourceNotFoundException.class})
    public ResponseEntity<?> getById(@RequestParam("id") ID id) {
        return ResponseEntity.ok().body(response.toResponse(service.findById(id)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/id")
    @JsonView(View.UI.class)
    public ResponseEntity<?> deleteById(@RequestParam("id") ID id) {
        service.deleteById(id);
        return ResponseEntity.ok().body(String.format("Delete entity with id %s success", id));
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/", method = RequestMethod.POST)
    @JsonView(View.UI.class)
    public ResponseEntity<?> addEntity(@RequestBody @Valid BaseResponse<?, T> response) {
        T saveEntity = service.save(response.toDto());
        return ResponseEntity.status(201).body(response.toListResponse(saveEntity));
    }

    @SuppressWarnings("unused")
    public ResponseEntity<?> getByIdFallback(ID id) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error server");
    }
}
