package com.example.ship.config;

import com.example.ship.model.Engine;
import com.example.ship.model.OwnOperator;
import com.example.ship.model.Ship;
import com.example.ship.model.ShipEngine;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ShipTestProperties {
	public Ship savedShip;
	public Ship updatedShip;
	public Ship deletedShip;
	public Ship retrieveShip;
	public List<Ship> ships;
	public OwnOperator savedOwnOperator;
	public OwnOperator deletedOwnOperator;
	public OwnOperator retrieveOwnOperator;
	public OwnOperator updatedOwnOperator;
	public List<OwnOperator> ownOperators;
	public ShipTestProperties() {

		ownOperators = new ArrayList<>();
		savedOwnOperator = new OwnOperator("first");
		deletedOwnOperator = new OwnOperator("second");
		retrieveOwnOperator = new OwnOperator("third");
		retrieveOwnOperator.setPhones(new String[]{ "89998887766", "89876543210" });
		updatedOwnOperator = retrieveOwnOperator;
		updatedOwnOperator.setAddress("example address");

		ownOperators.add(deletedOwnOperator);
		ownOperators.add(retrieveOwnOperator);
		ownOperators.add(new OwnOperator("fourth"));

		ships = new ArrayList<>();

		deletedShip = new Ship(2, "second", 2001);
		var deletedShipEngine = new ShipEngine(deletedShip.getId());
		var deletedEngine = new Engine(1, 1000, "sas");
		deletedEngine.setShipEngine(deletedShipEngine);
		deletedShipEngine.setEngines(List.of(deletedEngine));
		deletedShip.setShipEngine(deletedShipEngine);

		retrieveShip = new Ship(1, "first", 2000);
		ShipEngine shipEngine = new ShipEngine(retrieveShip.getId());
		Engine engine = new Engine(1, 1000, "example dvig");
		engine.setShipEngine(shipEngine);
		shipEngine.setEngines(List.of(engine));
		retrieveShip.setOperatorName(retrieveOwnOperator.getName());
		retrieveShip.setOwnName(retrieveOwnOperator.getName());
		retrieveShip.setShipEngine(shipEngine);

		savedShip = new Ship(4, "fourth", 2000);
		updatedShip = retrieveShip;
		updatedShip.setType("буксир");

		ships.add(retrieveShip);
		ships.add(deletedShip);
		ships.add(new Ship(3, "third", 2002));

		ships.sort(Comparator.comparing(Ship::getId));
	}
}
