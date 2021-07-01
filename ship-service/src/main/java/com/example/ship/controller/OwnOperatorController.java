package com.example.ship.controller;

import com.example.ship.config.View;
import com.example.ship.model.OwnOperator;
import com.example.ship.response.BaseResponse;
import com.example.ship.response.ListResponse;
import com.example.ship.response.OwnOperatorResponse;
import com.example.ship.service.OwnOperatorService;
import com.fasterxml.jackson.annotation.JsonView;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/ownoperator")
@Slf4j
public class OwnOperatorController extends BaseController<OwnOperator, String> {

	private final OwnOperatorService service;

	public OwnOperatorController(OwnOperatorService service, BaseResponse<OwnOperatorResponse, OwnOperator> response) {
		super(service, response);
		this.service = service;
	}

	@GetMapping("")
	@JsonView(View.UI.class)
	@HystrixCommand(fallbackMethod = "getOwnOperatorsFallback")
	public ResponseEntity<?> getPageWithSort(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
																					 @RequestParam(value = "size", required = false, defaultValue = "20") int size,
																					 @RequestParam(value = "sort", required = false, defaultValue = "name") String sort,
																					 @RequestParam(value = "search", required = false, defaultValue = "") String searchText) {
		return ResponseEntity.ok(service
			.findPage(page - 1, size, sort, searchText)
			.stream().map(response::toListResponse)
			.collect(Collectors.toList())
		);
	}

	@GetMapping("/count")
	public ResponseEntity<?> getCountPage(@RequestParam(value = "size", required = false, defaultValue = "20") int size,
																				@RequestParam(value = "search", required = false, defaultValue = "") String searchText) {
		return ResponseEntity.ok(service.getCountPage(size, searchText));
	}

	@PutMapping("/")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> update(@RequestBody OwnOperatorResponse response) {
		log.info("edit ownOperator");
		return ResponseEntity.ok().body(response.toListResponse(service.update(response.toDto())));
	}

	@DeleteMapping("/all")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteAllById(@RequestBody ListResponse<String> listResponse) {
		log.info("delete ownOperators");
		service.deleteAllById(listResponse.getListId());
		return ResponseEntity.ok("Delete success");
	}

	/** @noinspection unused*/
	public ResponseEntity<?> getOwnOperatorsFallback(int size, int page, String sort, String searchText) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error server");
	}
}
