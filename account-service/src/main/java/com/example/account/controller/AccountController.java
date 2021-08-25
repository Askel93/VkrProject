package com.example.account.controller;

import com.example.account.response.AccountResponse;
import com.example.account.service.AccountService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.security.Principal;
import java.util.stream.Collectors;

@RestController
@Slf4j
@AllArgsConstructor
public class AccountController {

  private final AccountService service;

  @PreAuthorize("hasRole('USER') or #oauth2.hasScope('ui')")
  @GetMapping("/profile")
  public ResponseEntity<?> getProfile(Principal principal) {
    log.info("retrieved profile {}", principal.getName());
    return ResponseEntity
      .ok()
      .body(AccountResponse.toResponse(service.getByUserName(principal.getName())));
  }

  @PutMapping("/profile")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<?> updateProfile(@Valid @RequestBody AccountResponse accountResponse, Principal principal) {
    log.info("update profile {}", accountResponse.getUserName());
    service.updateUser(accountResponse, principal.getName());
    return ResponseEntity
      .ok()
      .body("Update user success");
  }

  @GetMapping("/name/{userName}")
  public ResponseEntity<?> getAccountByUserName(@PathVariable("userName") String userName) {
    return ResponseEntity
      .ok()
      .body(AccountResponse.toResponse(service.getByUserName((userName))));
  }

  @GetMapping("/email/{email}")
  public ResponseEntity<?> getAccountByEmail(@PathVariable("email") String email) {
    return ResponseEntity
      .ok()
      .body(AccountResponse.toResponse(service.getByEmail(email)));
  }

  @PostMapping("/signUp")
  public ResponseEntity<?> createAccount(@Valid @RequestBody AccountResponse accountResponse) {
    log.info("create user");
    return ResponseEntity
      .status(201)
      .body(AccountResponse.toResponse(service.createUser(accountResponse)));
  }

  @GetMapping("/")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> getUsers() {
    return ResponseEntity
      .ok()
      .body(service.getUsers()
        .stream()
        .map(AccountResponse::toResponse)
        .collect(Collectors.toList())
      );
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public void invalidArgumentHandler(MethodArgumentNotValidException e, HttpServletResponse res) throws IOException {
    var error = new StringBuilder();
    e.getBindingResult()
      .getAllErrors()
      .stream()
      .map(DefaultMessageSourceResolvable::getDefaultMessage)
      .forEach(error::append);
    res.sendError(400, error.toString());
  }
}
