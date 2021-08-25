package com.example.ship.controller;

import com.example.ship.ShipServiceApplicationTests;
import com.example.ship.config.ShipTestProperties;
import com.example.ship.model.OwnOperator;
import com.example.ship.model.Ship;
import com.example.ship.repository.OwnOperatorRepository;
import com.example.ship.repository.ShipRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

@WebAppConfiguration
public class ControllerTest extends ShipServiceApplicationTests {

	protected MockMvc mvc;

	@Autowired
	protected WebApplicationContext context;

	@Autowired
	protected ShipRepository shipRepository;
	@Autowired
	protected OwnOperatorRepository ownOperatorRepository;

	protected static ShipTestProperties prop = new ShipTestProperties();

	protected static Ship savedShip = prop.savedShip;
	protected static Ship deletedShip = prop.deletedShip;
	protected static Ship retrieveShip = prop.retrieveShip;
	protected static Ship updatedShip = prop.updatedShip;
	protected static List<Ship> ships = prop.ships;
	protected static List<OwnOperator> ownOperators = prop.ownOperators;
	protected static OwnOperator savedOwnOperator = prop.savedOwnOperator;
	protected static OwnOperator deletedOwnOperator = prop.deletedOwnOperator;
	protected static OwnOperator retrieveOwnOperator = prop.retrieveOwnOperator;
	protected static OwnOperator updatedOwnOperator = prop.updatedOwnOperator;

	protected static boolean isInit = false;

	@BeforeEach
	protected void setUp() {
		mvc = MockMvcBuilders
				.webAppContextSetup(context)
				.apply(springSecurity())
				.build();
		if (isInit) return;
		shipRepository.deleteAllById(ships.stream().map(Ship::getId).collect(Collectors.toList()));
		ownOperatorRepository.deleteAll();

		ownOperators.forEach(ownOperatorRepository::save);
		ships.forEach(shipRepository::save);
		isInit = true;
	}
}
