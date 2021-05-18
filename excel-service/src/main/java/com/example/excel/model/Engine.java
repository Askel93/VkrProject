package com.example.excel.model;

import lombok.Data;

@SuppressWarnings("SpellCheckingInspection")
@Data
public class Engine {

	private int count;
	private int pwr;
	private String dvig;

	public Engine(int count, int pwr, String dvig) {
		this.count = count;
		this.pwr = pwr;
		this.dvig = dvig;
	}
}
