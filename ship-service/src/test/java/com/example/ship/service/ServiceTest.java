package com.example.ship.service;

import com.example.ship.config.ShipTestProperties;
import com.example.ship.model.OwnOperator;
import com.example.ship.model.Ship;
import org.junit.Assert;

import java.util.List;

public class ServiceTest extends Assert {

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

}
