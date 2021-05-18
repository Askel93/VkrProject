package com.example.ship.controller;

import com.example.ship.model.ShipEngine;
import com.example.ship.service.ShipEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/shipEngine")
public class ShipEngineController {

	private final ShipEngineService service;

	public ShipEngineController(ShipEngineService service) {
		this.service = service;
	}

	@PostMapping("/all")
	public ResponseEntity<?> saveAll(@RequestBody List<ShipEngine> shipEngine) {
		return ResponseEntity.ok(service.saveAll(shipEngine));
	}
}
