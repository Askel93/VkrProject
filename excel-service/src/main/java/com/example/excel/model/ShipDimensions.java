package com.example.excel.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("SpellCheckingInspection")
@Data
@Builder
@NoArgsConstructor
public class ShipDimensions {

	private int regNum;
	private Integer disp;
	private Double length;
	private Double breadth;
	private Double draught;
	private Double depth;
	private String shipClass;
}
