package com.example.account.controller;

import com.example.account.config.AuthClientMock;
import com.example.account.config.WireMockConfig;
import com.example.account.response.AccountResponse;
import com.github.tomakehurst.wiremock.WireMockServer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles({"feign-success"})
@ContextConfiguration(
  classes = {
    WireMockConfig.class
  }
)
class AccountControllerTest extends ControllerTest {

  @Autowired
  private WireMockServer mockAuthService;
  private static boolean isInit = false;

  private final AccountResponse response = new AccountResponse("nikita", "email@mail.ru", "Password12");
  private final AccountResponse response2 = new AccountResponse("example", "example@gmail.com", "Password12");
  private final AccountResponse response3 = new AccountResponse("second", "example@mail.ru", "Password12");

  @BeforeEach
  @Override
  protected void setUp() {
    if (!isInit) {
      AuthClientMock.setUpAuthClientResponse(mockAuthService);
      isInit = true;
    }
    super.setUp();
  }

  @Test
  void createUserSuccess() throws Exception {
    mvc.perform(post("/signUp")
      .contentType(MediaType.APPLICATION_JSON)
      .content(mapToJson(response)))
      .andDo(print())
      .andExpect(status().isCreated())
    ;
  }

  @Test
  void createUserFailureUserNameExists() throws Exception {
    mvc.perform(post("/signUp")
      .contentType(MediaType.APPLICATION_JSON)
      .content(mapToJson(response2)))
      .andDo(print())
      .andExpect(status().isBadRequest())
    ;
  }

  @Test
  void createUserFailureEmailExists() throws Exception {
    mvc.perform(post("/signUp")
      .contentType(MediaType.APPLICATION_JSON)
      .content(mapToJson(response3)))
      .andDo(print())
      .andExpect(status().isBadRequest())
    ;
  }
}
