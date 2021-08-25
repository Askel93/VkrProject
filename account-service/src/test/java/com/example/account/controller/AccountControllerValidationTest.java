package com.example.account.controller;

import com.example.account.AllTest;
import com.example.account.response.AccountResponse;
import com.example.account.service.AccountService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AccountController.class)
class AccountControllerValidationTest extends AllTest {

  @MockBean
  private AccountService accountService;
  @Autowired
  private MockMvc mvc;

  private final AccountResponse invalidPwd = new AccountResponse("nikita", "email@mail.ru", "Passwo");
  private final AccountResponse invalidEmail = new AccountResponse("nikita", "email", "Password1312");
  private final AccountResponse invalidUserName = new AccountResponse("nik;", "email@mail.ru", "Password1312");

  @Test
  void invalidPassword() throws Exception {
    mvc.perform(post("/signUp")
      .contentType(MediaType.APPLICATION_JSON)
      .content(mapToJson(invalidPwd)))
      .andDo(print())
      .andExpect(status().isBadRequest())
    ;
  }

  @Test
  void invalidEmail() throws Exception {
    mvc.perform(post("/signUp")
      .contentType(MediaType.APPLICATION_JSON)
      .content(mapToJson(invalidEmail)))
      .andDo(print())
      .andExpect(status().isBadRequest())
    ;
  }

  @Test
  void invalidUserName() throws Exception {
    mvc.perform(post("/signUp")
      .contentType(MediaType.APPLICATION_JSON)
      .content(mapToJson(invalidUserName)))
      .andDo(print())
      .andExpect(status().isBadRequest())
      .andExpect(res -> {
        assertNotNull(res.getResponse().getErrorMessage());
        assertTrue(res.getResponse().getErrorMessage().contains("Please provide a valid username"));
      })
    ;
  }
}
