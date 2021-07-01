package com.example.ship.response;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "_type")
@JsonSubTypes({
		@JsonSubTypes.Type(value = OwnOperatorResponse.class, name = "ownOperator"),
		@JsonSubTypes.Type(value = ShipResponse.class, name = "ship")
})
public abstract class BaseResponse<S, T> {

	public abstract S toResponse(T t);
	public abstract S toListResponse(T t);
	public abstract T toDto();
}
