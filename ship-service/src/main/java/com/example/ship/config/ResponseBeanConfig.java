package com.example.ship.config;

import com.example.ship.model.OwnOperator;
import com.example.ship.model.Ship;
import com.example.ship.response.BaseResponse;
import com.example.ship.response.OwnOperatorResponse;
import com.example.ship.response.ShipResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ResponseBeanConfig {


	@Bean
	public BaseResponse<ShipResponse, Ship> getShipResponse() {
		return new ShipResponse();
	}

	@Bean
	public BaseResponse<OwnOperatorResponse, OwnOperator> getOwnOperatorResponse() {
		return new OwnOperatorResponse();
	}
}
