package com.example.auth.controller;

import com.example.auth.response.AccountResponse;
import com.example.auth.response.AdminResponse;
import com.example.auth.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@Slf4j
public class AccountController {

    @Autowired
    private AccountService service;

    @RequestMapping(value = "/current", method = RequestMethod.GET)
    public Principal getUser(Principal principal) {
        return principal;
    }

    @PreAuthorize("#oauth2.hasScope('server')")
    @RequestMapping(method = RequestMethod.POST, value = "")
    public void createAccount(@Valid @RequestBody AccountResponse response) {
        service.createAccount(response);
    }

    @PreAuthorize("#oauth2.hasScope('server')")
    @RequestMapping(method = RequestMethod.PUT, value = "")
    public void updateAccount(@Valid @RequestBody AccountResponse response) {
        service.updateAccount(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(method = RequestMethod.GET, value = "")
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok().body(service
            .getUsers()
            .stream()
            .map(AdminResponse::toResponse)
            .collect(Collectors.toList())
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(method = RequestMethod.POST, value = "/toAdmin")
    public ResponseEntity<?> addAdmin(@RequestBody AdminResponse response) {
        service.addToAdmin(response.getUserName());
        return ResponseEntity.ok().body(String.format("Account %s added to admin", response.getUserName()));
    }
}
