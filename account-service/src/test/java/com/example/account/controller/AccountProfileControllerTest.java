package com.example.account.controller;

import com.example.account.response.AccountResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AccountProfileControllerTest extends ControllerTest {

  @Override
  @BeforeEach
  protected void setUp() {
    super.setUp();
  }

  @Test
  @WithMockUser(username = "example")
  void getProfileSuccess() throws Exception {
    var mvcResult = mvc.perform(get("/profile"))
      .andDo(print())
      .andExpect(status().isOk())
      .andReturn();
    var content = mvcResult.getResponse().getContentAsString();
    var account = mapFromJson(content, AccountResponse.class);
    assertEquals(account.getUserName(), "example");
    assertEquals(account.getEmail(), savedAccount.getEmail());
  }

  @Test
  void getProfileFailureUnauthorized() throws Exception{
    mvc.perform(get("/profile"))
      .andDo(print())
      .andExpect(status().isForbidden());
  }
}
