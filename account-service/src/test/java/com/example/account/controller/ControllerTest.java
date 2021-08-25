package com.example.account.controller;

import com.example.account.AccountServiceApplicationTests;
import com.example.account.repository.AccountRepository;
import com.example.account.response.AccountResponse;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

public class ControllerTest extends AccountServiceApplicationTests {

  @Autowired
  private AccountRepository repository;

  protected MockMvc mvc;

  protected AccountResponse savedAccount = new AccountResponse("example", "example@mail.ru", "Password12");

  @BeforeEach
  protected void setUp() {
    mvc = MockMvcBuilders
      .webAppContextSetup(context)
      .apply(springSecurity())
      .build();
    repository.save(savedAccount.toDto());
  }

  @AfterEach
  void reset() {
    repository.deleteAll();
  }
}
