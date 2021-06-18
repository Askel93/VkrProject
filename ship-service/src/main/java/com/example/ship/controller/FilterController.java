package com.example.ship.controller;

import com.example.ship.service.FilterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/filter")
@RestController
@Slf4j
public class FilterController {

	@Autowired
	private FilterService service;

	@GetMapping("/getFilters")
	public ResponseEntity<?> getFilters() {
		return ResponseEntity.ok().body(service.getFilters());
	}
}
