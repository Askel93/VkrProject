package com.example.excel.client;

import com.example.excel.response.ListResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "ship-service")
public interface ShipClient {

	@RequestMapping(value = "/ship/toExcel", method = RequestMethod.POST)
	Object getAllById(ListResponse<Integer> listResponse);

	@RequestMapping(value = "/ship/own/ToExcel", method = RequestMethod.POST)
	Object getAllByOwnOperator(ListResponse<String> listResponse);
}
