package com.example.ship.controller;

import com.example.ship.config.View;
import com.example.ship.response.ListResponse;
import com.example.ship.response.ShipResponse;
import com.example.ship.service.ShipService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@AllArgsConstructor
public class ExcelController {

	private final ShipService service;


	@PreAuthorize("#oauth2.hasScope('server')")
	@JsonView(View.UI.class)
	@RequestMapping(
			value = "/toExcel",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE
	)
	@ResponseBody
	public List<ShipResponse> getAllById(@RequestBody ListResponse<Integer> listResponse) {
		log.info("get ships to excel");
		List<ShipResponse> ships = service.getAllById(listResponse.getListId())
				.stream()
				.map(ShipResponse::toResponse)
				.collect(Collectors.toList())
				;
		log.info("{}", ships.size());
		return ships;
	}

	@PreAuthorize("#oauth2.hasScope('server')")
	@JsonView(View.UI.class)
	@RequestMapping(value = "/own/ToExcel", method = RequestMethod.POST)
	@ResponseBody
	public List<ShipResponse> getAllByOwnOperator(@RequestBody ListResponse<String> listResponse) {
		return service.getAllByOwnOperator(listResponse.getListId())
				.stream()
				.map(ShipResponse::toResponse)
				.collect(Collectors.toList());
	}
}
