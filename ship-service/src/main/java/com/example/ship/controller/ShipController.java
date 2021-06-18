package com.example.ship.controller;

import com.example.ship.config.View;
import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.model.Ship;
import com.example.ship.response.Filters;
import com.example.ship.response.ListResponse;
import com.example.ship.response.ShipResponse;
import com.example.ship.service.ShipService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/ship")
public class ShipController extends BaseController<Ship, Integer> {

    private final ShipService service;

    public ShipController(ShipService service) {
        super(service);
        this.service = service;
    }

    @Override
    @GetMapping("/{id}")
    @JsonView(View.UI.class)
    public ResponseEntity<?> getById(@PathVariable("id") Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(ShipResponse.toResponse(service.findById(id)));
    }

    @PutMapping("/")
    public ResponseEntity<?> updateShip(@RequestBody Ship ship) {
        return ResponseEntity.ok(service.update(ship));
    }

    @PostMapping("/all")
    @JsonView(View.REST.class)
    public ResponseEntity<?> saveAll(@RequestBody List<Ship> ships) {
        log.info("save ships");
        service.saveAll(ships);
        return ResponseEntity.ok().body("");
    }

    @GetMapping("")
    @JsonView(View.UI.class)
    public ResponseEntity<?> getShipsWithSort(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                              @RequestParam(value = "size", required = false, defaultValue = "20") int size,
                                              @RequestParam(value = "sort", required = false, defaultValue = "id") String sort,
                                              @RequestParam(value = "search", required = false, defaultValue = "") String searchText,
                                              Filters filters) {
        return ResponseEntity.ok(
            service
                .findPage(page - 1, size, sort, searchText, filters)
                .stream()
                .map(ShipResponse::toListResponse)
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
}