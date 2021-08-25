package com.example.account.config;

import com.example.account.client.FeignAuthServiceClient;
import com.example.account.repository.AccountRepository;
import com.example.account.response.AccountResponse;
import com.example.account.service.AccountService;
import com.example.account.service.impl.AccountServiceImpl;
import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Configuration
@Profile("test")
public class AuthClientMock {

  public static void setUpAuthClientResponse(WireMockServer mockService) {
    mockService.stubFor(WireMock.post(WireMock.urlEqualTo("/uaa/users"))
      .willReturn(
        WireMock.aResponse()
          .withStatus(HttpStatus.OK.value())))
    ;
  }

  @Bean
  @Primary
  public AccountService accountService(AccountRepository repository, FeignAuthServiceClient authClient) {
    System.out.println(authClient);
    return new AccountServiceImpl(repository, authClient);
  }

  @Bean(name = "authClient")
  @Profile("feign-success")
  public FeignAuthServiceClient authClientSuccess() {
    return new FeignAuthServiceClient() {

      @Override
      public void createUser(AccountResponse response) {
      }

      @Override
      public void updateUser(AccountResponse response) throws ResponseStatusException {
      }
    };
  }

  @Bean
  @Profile("feign-failure")
  public FeignAuthServiceClient authClientFailure() {
    return new FeignAuthServiceClient() {
      @Override
      public void createUser(AccountResponse response) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
      }

      @Override
      public void updateUser(AccountResponse response) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    };
  }
}
