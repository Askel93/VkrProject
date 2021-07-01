package com.example.ship.controller;

import com.example.ship.config.View;
import com.example.ship.model.Ship;
import com.example.ship.response.BaseResponse;
import com.example.ship.response.ListResponse;
import com.example.ship.response.ShipResponse;
import com.example.ship.service.ExcelService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@AllArgsConstructor
public class ExcelController {

	private final ExcelService service;
	private final BaseResponse<ShipResponse, Ship> response;


	@PreAuthorize("#oauth2.hasScope('server')")
	@JsonView(View.UI.class)
	@RequestMapping(value = "/toExcel", method = RequestMethod.POST)
	@ResponseBody
	public List<ShipResponse> getAllById(@RequestBody ListResponse<Integer> listResponse) {
		log.info("get ships to excel");
		return service.getAllById(listResponse.getListId())
				.stream()
				.map(response::toResponse)
				.collect(Collectors.toList());
	}

	@PreAuthorize("#oauth2.hasScope('server')")
	@JsonView(View.UI.class)
	@RequestMapping(value = "/own/ToExcel", method = RequestMethod.POST)
	@ResponseBody
	public List<ShipResponse> getAllByOwnOperator(@RequestBody ListResponse<String> listResponse) {
		return service.getAllByOwnOperator(listResponse.getListId())
				.stream()
				.map(response::toResponse)
				.collect(Collectors.toList());
	}
}
