package com.example.account.controller;

import com.example.account.AllTest;
import com.example.account.response.AccountResponse;
import com.example.account.service.AccountService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AccountController.class)
class ControllerProfileMockTest extends AllTest {

  @MockBean
  private AccountService service;
  @Autowired
  private MockMvc mvc;

  private AccountResponse response = new AccountResponse("nikita", "email@mail.ru", "Password12");

  @DisplayName("Successful profile receiving ")
  @Test
  @WithMockUser(username = "nikita")
  void getProfileSuccess() throws Exception {

    doReturn(response.toDto()).when(service).getByUserName("nikita");

    var mvcResult = mvc.perform(get("/profile"))
      .andDo(print())
      .andExpect(status().isOk())
      .andReturn()
      ;
    var content = mvcResult.getResponse().getContentAsString();
    var res = mapFromJson(content, AccountResponse.class);
    assertEquals(res.getUserName(), "nikita");
    assertNull(res.getPassword());
  }

//  @Test
//  void getProfileFailureUnauthorized() throws Exception {
//    mvc.perform(get("/profile"))
//      .andDo(print())
//      .andExpect(status().isUnauthorized())
//    ;
//  }
}
