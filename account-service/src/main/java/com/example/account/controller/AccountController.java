package com.example.account.controller;

import com.example.account.response.AccountResponse;
import com.example.account.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@Slf4j
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PreAuthorize("hasRole('USER') or #oauth2.hasScope('ui')")
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Principal principal) {
        log.info("retrieved profile {}", principal.getName());
        return ResponseEntity.ok().body(accountService.getByUserName(principal.getName()));
    }

    @GetMapping("/name/{userName}")
    public ResponseEntity<?> getAccountByUserName(@PathVariable("userName") String userName) {
        return ResponseEntity
                .ok()
                .body(accountService.getByUserName((userName)));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getAccountByEmail(@PathVariable("email") String email) {
        return ResponseEntity
                .ok()
                .body(accountService.getByEmail(email));
    }

    @PostMapping("/signUp")
    public ResponseEntity<?> createAccount(@Valid @RequestBody AccountResponse accountResponse) {
        log.info("create user");
        return ResponseEntity.status(201).body(accountService.createUser(accountResponse));
    }
}
