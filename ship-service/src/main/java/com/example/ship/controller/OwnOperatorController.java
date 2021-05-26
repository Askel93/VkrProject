package com.example.ship.controller;

import com.example.ship.config.View;
import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.model.OwnOperator;
import com.example.ship.response.ListResponse;
import com.example.ship.response.OwnOperatorResponse;
import com.example.ship.service.OwnOperatorService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ownoperator")
@Slf4j
public class OwnOperatorController extends BaseController<OwnOperator, String> {

	private final OwnOperatorService service;

	public OwnOperatorController(OwnOperatorService service) {
		super(service);
		this.service = service;
	}

	@PostMapping("/all")
	public ResponseEntity<?> saveAll(@RequestBody List<OwnOperator> ownOperators) {
		service.saveAll(ownOperators);
		return ResponseEntity.ok("");
	}

	@Override
	@GetMapping("/id")
	@JsonView(View.UI.class)
	public ResponseEntity<?> getById(@RequestParam("name") String name) throws ResourceNotFoundException {
		return ResponseEntity.ok().body(OwnOperatorResponse.toResponse(service.findById(name)));
	}

	@GetMapping("")
	@JsonView(View.UI.class)
	public ResponseEntity<?> getPageWithSort(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
																					 @RequestParam(value = "size", required = false, defaultValue = "20") int size,
																					 @RequestParam(value = "sort", required = false, defaultValue = "name") String sort,
																					 @RequestParam(value = "search", required = false, defaultValue = "") String searchText) {
		return ResponseEntity.ok(service.findPage(page - 1, size, sort, searchText));
	}

	@GetMapping("/count")
	public ResponseEntity<?> getCountPage(@RequestParam(value = "size", required = false, defaultValue = "20") int size,
																				@RequestParam(value = "search", required = false, defaultValue = "") String searchText) {
		return ResponseEntity.ok(service.getCountPage(size, searchText));
	}

	@PutMapping("/")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> update(@RequestBody OwnOperator ownOperator) {
		log.info("edit ownOperator");
		return ResponseEntity.ok().body(service.update(ownOperator));
	}

	@DeleteMapping("/all")
	public ResponseEntity<?> deleteAllById(@RequestBody ListResponse<String> listResponse) {
		log.info("delete ownOperators");
		service.deleteAllById(listResponse.getListId());
		return ResponseEntity.ok("Delete success");
	}
}
