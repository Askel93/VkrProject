package com.example.ship.response;

import com.example.ship.config.View;
import com.example.ship.model.OwnOperator;
import com.example.ship.model.Ship;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@JsonView(View.UI.class)
public class OwnOperatorResponse {
	private String name;
	private String address;
	private String email;
	private String[] phones;
	private String[] fax;
	private List<Ship> shipsOwn;
	private List<Ship> shipsOperator;

	public static OwnOperatorResponse toResponse(OwnOperator ownOperator) {
		return OwnOperatorResponse.builder()
				.name(ownOperator.getName())
				.address(ownOperator.getAddress())
				.email(ownOperator.getEmail())
				.phones(ownOperator.getPhones())
				.fax(ownOperator.getFax())
				.shipsOwn(ownOperator.getShipsOwn())
				.shipsOperator(ownOperator.getShipsOperator())
				.build();
	}
}
