package com.example.ship.service.ownoperator;

import com.example.ship.repository.OwnOperatorRepository;
import com.example.ship.repository.impl.OwnOperatorRepositoryImpl;
import com.example.ship.service.OwnOperatorService;
import com.example.ship.service.ServiceTest;
import com.example.ship.service.impl.OwnOperatorServiceImpl;
import org.mockito.Mockito;

public class OwnOperatorInitServiceTest extends ServiceTest {

	protected OwnOperatorRepository repository;

	protected OwnOperatorService service;

	public OwnOperatorInitServiceTest() {
		repository = Mockito.mock(OwnOperatorRepositoryImpl.class);
		service = new OwnOperatorServiceImpl(repository);
	}

}
