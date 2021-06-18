package com.example.ship.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CapacityFilter {
	private Integer minDedv;
	private Integer maxDedv;
	private Integer minPassK;
	private Integer maxPassK;
	private Integer minPassP;
	private Integer maxPassP;
	private Integer minNt;
	private Integer maxNt;
	private Integer minGt;
	private Integer maxGt;
}
