package com.example.ship.response;

import com.example.ship.config.View;
import com.example.ship.model.*;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@JsonView(View.UI.class)
public class ShipResponse
		extends BaseResponse<ShipResponse, Ship>
{
	private String _type;

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

	public ShipResponse() {
		super();
	}

	@Override
	public ShipResponse toListResponse(Ship ship) {
		return ShipResponse.builder()
				._type("ship")
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
				.build();
	}

	@Override
	public ShipResponse toResponse(Ship ship) {
		var shipResponse = ShipResponse.builder()
				._type("ship")
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
				.shipEngine(ship.getShipEngine())
				.shipCapacity(ship.getShipCapacity())
				.shipDimensions(ship.getShipDimensions())
				.build();
		if (ship.isNotEmptyOwn()) {
			shipResponse.setOwn(ship.getOwn());
			shipResponse.setOwnName(ship.getOwnName());
		}
		if (ship.isNotEmptyOperator()) {
			shipResponse.setOperator(ship.getOperator());
			shipResponse.setOperatorName(ship.getOperatorName());
		}
		return shipResponse;
	}

	public Ship toDto() {
		return new Ship(id, name, type, subType,
										imo, callSign, project, port,
										speed, godP, ownName, own,
										operatorName, operator, shipEngine,
										shipCapacity, shipDimensions);
	}
}
