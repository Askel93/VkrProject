package com.example.excel.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ShipEngine {

	private int regNum;
	private Engine engine1;
	private Engine engine2;
	private Engine engine3;
	private int sumPwr;

	public ShipEngine(Ship ship, Engine engine1, Engine engine2, Engine engine3) {
		this.regNum = ship.getId();
		this.engine1 = engine1;
		this.engine2 = engine2;
		this.engine3 = engine3;
		sumPwr();
	}

	private void sumPwr() {
		this.sumPwr = engine1 == null ? 0 : engine1.getPwr() * engine1.getCount();
		this.sumPwr += engine2 == null ? 0 : engine2.getPwr() * engine2.getCount();
		this.sumPwr += engine3 == null ? 0 : engine3.getPwr() * engine3.getCount();
	}
}
