package com.example.account.service;

import com.example.account.exception.ResourceExistsException;
import com.example.account.model.Account;
import com.example.account.response.AccountResponse;
import org.junit.jupiter.api.Test;
import org.mockito.InOrder;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class ServiceCreateUserTest extends ServiceMockTest {

  private final AccountResponse response = new AccountResponse("nikita", "email@mail.ru", "Password1312");

  @Test
  void createUserSuccess() {
    doReturn(Optional.empty())
      .when(repository).findByName(anyString());
    doReturn(Optional.empty())
      .when(repository).findByEmail(anyString());
    doReturn(response.toDto())
      .when(repository).save(any(Account.class));

    var res = service.createUser(response);
    assertEquals(res.getName(), response.getUserName());
    InOrder inOrder = inOrder(repository);
    inOrder.verify(repository).findByName(anyString());
    inOrder.verify(repository).findByEmail(anyString());
    inOrder.verify(repository).save(any(Account.class));
  }

  @Test
  void createUserFailureUserNameExists() {
    doReturn(Optional.of(response.toDto()))
      .when(repository).findByName(anyString());

    assertThrows("User with username nikita already exists", ResourceExistsException.class, () ->
      service.createUser(response)
    );

    verify(repository, times(0)).save(any(Account.class));
    verify(repository, times(0)).findByEmail(anyString());
  }

  @Test
  void createUserFailureEmailExists() {
    doReturn(Optional.of(response.toDto()))
      .when(repository).findByEmail(anyString());

    assertThrows(String.format("User with email %s already exists", response.getEmail()),
        ResourceExistsException.class, () ->
            service.createUser(response));

    InOrder inOrder = inOrder(repository);
    inOrder.verify(repository).findByName(anyString());
    inOrder.verify(repository).findByEmail(anyString());
    inOrder.verify(repository, times(0)).save(any(Account.class));
  }
}
