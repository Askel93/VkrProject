package com.example.account.service;

import com.example.account.AllTest;
import com.example.account.client.FeignAuthServiceClient;
import com.example.account.repository.AccountRepository;
import com.example.account.service.impl.AccountServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.MockitoAnnotations.initMocks;

public class ServiceMockTest extends AllTest {

  @Mock
  protected AccountRepository repository;
  @Mock
  protected FeignAuthServiceClient client;
  @InjectMocks
  protected AccountServiceImpl service;

  @BeforeEach
  void setUp() {
    initMocks(this);
  }
}
