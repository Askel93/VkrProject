package com.example.ship.service.ship;

import com.example.ship.repository.impl.ShipRepositoryImpl;
import com.example.ship.service.ServiceTest;
import com.example.ship.service.ShipService;
import com.example.ship.service.impl.ShipServiceImpl;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.test.context.ActiveProfiles;

@RunWith(MockitoJUnitRunner.class)
@ActiveProfiles("mockTest")
public class ShipInitServiceTest extends ServiceTest {

	protected ShipRepositoryImpl repository;

	protected ShipService service;

	public ShipInitServiceTest() {
		repository = Mockito.mock(ShipRepositoryImpl.class);
		service = new ShipServiceImpl(repository);
	}
}