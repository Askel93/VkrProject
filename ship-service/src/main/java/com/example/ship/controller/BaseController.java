package com.example.ship.controller;

import com.example.ship.config.View;
import com.example.ship.service.BaseService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

public class BaseController<T, ID> {
    
    protected BaseService<T, ID> service;

    public BaseController(BaseService<T, ID> service) {
        this.service = service;
    }

    @GetMapping("/")
    @JsonView(View.UI.class)
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok().body(service.findAll());
    }

    @GetMapping("/{id}")
    @JsonView(View.UI.class)
    public ResponseEntity<?> getById(@PathVariable("id") ID id) {
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    @JsonView(View.UI.class)
    public ResponseEntity<?> deleteById(@PathVariable("id") ID id) {
        service.deleteById(id);
        return ResponseEntity.ok().body(String.format("Delete entity with id %s success", id));
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/",
        method = RequestMethod.POST,
        headers = { "Content-type=application/json" })
    @JsonView(View.UI.class)
    public ResponseEntity<?> addEntity(@RequestBody @Valid T entity) {

        T saveEntity = service.save(entity);
        return ResponseEntity.status(201).body(saveEntity);
    }
}
