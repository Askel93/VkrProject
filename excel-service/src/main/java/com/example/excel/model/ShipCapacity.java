package com.example.excel.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("SpellCheckingInspection")
@Data
@NoArgsConstructor
public class ShipCapacity {

	private Integer regNum;
	private Integer dedv;
	private Integer passK;
	private Integer passP;
	private Integer gt;
	private Integer nt;

	public ShipCapacity(Integer dedv, Integer passK, Integer passP, Integer gt, Integer nt) {
		this.dedv = dedv;
		this.passK = passK;
		this.passP = passP;
		this.gt = gt;
		this.nt = nt;
	}
}