package com.example.ship.controller;

import com.example.ship.config.View;
import com.example.ship.model.Ship;
import com.example.ship.response.BaseResponse;
import com.example.ship.response.Filters;
import com.example.ship.response.ListResponse;
import com.example.ship.response.ShipResponse;
import com.example.ship.service.ShipService;
import com.fasterxml.jackson.annotation.JsonView;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/ship")
public class ShipController extends BaseController<Ship, Integer> {

    private final ShipService service;

    public ShipController(ShipService service, BaseResponse<ShipResponse, Ship> response) {
        super(service, response);
        this.service = service;
    }

    @PutMapping("/")
    @JsonView(View.UI.class)
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateShip(@RequestBody ShipResponse response) {
        var updatedShip = service.update(response.toDto());
        return ResponseEntity.ok(response.toListResponse(updatedShip));
    }

    @GetMapping("")
    @JsonView(View.UI.class)
    @HystrixCommand(fallbackMethod = "shipsFallback")
    public ResponseEntity<?> getShipsWithSort(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                              @RequestParam(value = "size", required = false, defaultValue = "20") int size,
                                              @RequestParam(value = "sort", required = false, defaultValue = "id") String sort,
                                              @RequestParam(value = "search", required = false, defaultValue = "") String searchText,
                                              Filters filters) {
        return ResponseEntity.ok(
            service
                .findPage(page - 1, size, sort, searchText, filters)
                .stream()
                .map(response::toListResponse)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/count")
    public ResponseEntity<?> getCountPage(
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "search", required = false, defaultValue = "") String searchText,
        Filters filters) {
        return ResponseEntity.ok(service.getCountPage(size, searchText, filters));
    }

    @DeleteMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAllById(@RequestBody ListResponse<Integer> listResponse) {
        log.info("delete ships");
        service.deleteAllById(listResponse.getListId());
        return ResponseEntity.ok("Delete success");
    }

    @SuppressWarnings("unused")
    public ResponseEntity<?> shipsFallback(int page, int size, String sort, String searchText, Filters filters) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error server");
    }
}