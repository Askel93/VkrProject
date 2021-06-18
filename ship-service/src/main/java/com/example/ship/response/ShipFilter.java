package com.example.ship.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@SuppressWarnings("unused")
@Data
@AllArgsConstructor
public class ShipFilter {
	private Integer minSpeed;
	private Integer maxSpeed;
	private Integer minGodP;
	private Integer maxGodP;

	private List<String> typeFilter;
	private List<String> portFilter;

	public ShipFilter(Integer minSpeed, Integer maxSpeed, Integer minGodP, Integer maxGodP) {
		this(minSpeed, maxSpeed, minGodP, maxGodP, null, null);
	}
}
