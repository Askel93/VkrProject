package com.example.account.service;

import com.example.account.AllTest;
import com.example.account.repository.AccountRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;

public class ServiceFindTest extends AllTest {

  @Mock
  private AccountRepository repository;
  @InjectMocks
  private AccountService service;
}
