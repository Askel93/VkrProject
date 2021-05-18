package com.example.ship.response;

import com.example.ship.config.View;
import com.fasterxml.jackson.annotation.JsonView;
import com.example.ship.model.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonView(View.UI.class)
public class ShipResponse {
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

	private ShipEngine shipEngine;

	private ShipCapacity shipCapacity;

	private ShipDimensions shipDimensions;

	public static ShipResponse toResponse(Ship ship) {
		return ShipResponse.builder()
				.id(ship.getId())
				.name(ship.getName())
				.type(ship.getType())
				.subType(ship.getSubType())
				.imo(ship.getImo())
				.callSign(ship.getCallSign())
				.project(ship.getProject())
				.port(ship.getPort())
				.speed(ship.getSpeed())
				.godP(ship.getGodP())
				.ownName(ship.getOwnName())
				.own(ship.getOwn())
				.operatorName(ship.getOperatorName())
				.operator(ship.getOperator())
				.shipEngine(ship.getShipEngine())
				.shipCapacity(ship.getShipCapacity())
				.shipDimensions(ship.getShipDimensions())
				.build();
	}
}
