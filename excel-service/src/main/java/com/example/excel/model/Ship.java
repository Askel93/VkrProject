package com.example.excel.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class Ship {

	private Integer id;
	private String name;
	private String type;
	private String subType;
	private Integer imo;
	private String callSign;
	private String project;
	private String port;
	private Integer speed;
	private Integer godP;

	private String ownName;
	private OwnOperator own;
	private String operatorName;
	private OwnOperator operator;

	private ShipCapacity shipCapacity;
	private ShipDimensions shipDimensions;
	private ShipEngine shipEngine;

	public void setOwnNameByOwn(OwnOperator own) {
		this.ownName = own == null ? null : own.getName();
	}
	public void setOperatorNameByOperator(OwnOperator operator) {
		this.operatorName = operator == null ? null : operator.getName();
	}
}
