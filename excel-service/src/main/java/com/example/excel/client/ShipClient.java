package com.example.excel.client;

import com.example.excel.response.ListResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "ship-service")
public interface ShipClient {

	@RequestMapping(
			method = RequestMethod.POST,
			value = "/ship/ship/toExcel",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE
	)
	Object getAllById(ListResponse listResponse);
}
