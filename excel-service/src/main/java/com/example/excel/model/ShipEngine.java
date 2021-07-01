package com.example.excel.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ShipEngine {

	private int regNum;
	private List<Engine> engines;
	private int sumPwr;

	public ShipEngine(Ship ship, List<Engine> engines) {
		this.regNum = ship.getId();
		this.engines = engines;
	}
}
