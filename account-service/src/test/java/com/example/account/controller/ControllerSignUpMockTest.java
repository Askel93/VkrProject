package com.example.account.controller;

import com.example.account.AllTest;
import com.example.account.exception.ResourceExistsException;
import com.example.account.response.AccountResponse;
import com.example.account.service.AccountService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AccountController.class)
class ControllerSignUpMockTest extends AllTest {

  @MockBean
  private AccountService accountService;
  @Autowired
  private MockMvc mvc;

  private AccountResponse response = new AccountResponse("nikita", "email@mail.ru", "Password12");

  @Test
  void creatUserSuccess() throws Exception {
    doReturn(response.toDto()).when(accountService).createUser(response);

    mvc.perform(post("/signUp")
      .contentType(MediaType.APPLICATION_JSON)
      .content(mapToJson(response)))
      .andDo(print())
      .andExpect(status().isCreated());
  }

  @Test
  void createUserFailureUserNameExists() throws Exception {

    doThrow(new ResourceExistsException("User with username nikita already exists"))
      .when(accountService).createUser(response);

    mvc.perform(post("/signUp")
      .contentType(MediaType.APPLICATION_JSON)
      .content(mapToJson(response)))
      .andDo(print())
      .andExpect(status().isBadRequest())
      .andExpect(status().reason("User with username nikita already exists"))
    ;
  }

  @Test
  void createUserFailureEmailExists() throws Exception {
    var errorMessage = String.format("User with email %s already exists", response.getEmail());
    doThrow(new ResourceExistsException(errorMessage))
      .when(accountService).createUser(response);

    mvc.perform(post("/signUp")
      .contentType(MediaType.APPLICATION_JSON)
      .content(mapToJson(response)))
      .andDo(print())
      .andExpect(status().isBadRequest())
      .andExpect(status().reason(errorMessage))
    ;
  }
}
