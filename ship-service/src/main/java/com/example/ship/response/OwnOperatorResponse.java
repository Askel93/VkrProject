package com.example.ship.response;

import com.example.ship.config.View;
import com.example.ship.model.OwnOperator;
import com.example.ship.model.Ship;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@JsonView(View.UI.class)
public class OwnOperatorResponse
		extends BaseResponse<OwnOperatorResponse, OwnOperator> {

	private String _type;

	private String name;
	private String address;
	private String email;
	@JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
	private String[] phones;
	@JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
	private String[] fax;
	private List<Ship> shipsOwn;
	private List<Ship> shipsOperator;

	public OwnOperatorResponse() {
		super();
		this._type = "ownOperator";
	}

	@Override
	public OwnOperatorResponse toResponse(OwnOperator ownOperator) {
		return OwnOperatorResponse.builder()
				._type("ownOperator")
				.name(ownOperator.getName())
				.address(ownOperator.getAddress())
				.email(ownOperator.getEmail())
				.phones(ownOperator.getPhones())
				.fax(ownOperator.getFax())
				.shipsOwn(ownOperator.getShipsOwn())
				.shipsOperator(ownOperator.getShipsOperator())
				.build();
	}

	@Override
	public OwnOperatorResponse toListResponse(OwnOperator ownOperator) {
		return ownOperator == null
				? null
				: OwnOperatorResponse.builder()
					._type("ownOperator")
					.name(ownOperator.getName())
					.phones(ownOperator.getPhones())
					.fax(ownOperator.getFax())
					.email(ownOperator.getEmail())
					.address(ownOperator.getAddress())
					.build()
					;
	}

	@Override
	public OwnOperator toDto() {
		return new OwnOperator(name, address, email, phones, fax);
	}
}
