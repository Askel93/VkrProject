package com.example.ship.service.impl;

import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.model.Ship;
import com.example.ship.repository.ShipRepository;
import com.example.ship.service.ShipService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipServiceImpl extends BaseServiceImpl<Ship, Integer> implements ShipService {

    private final ShipRepository repository;

    public ShipServiceImpl(ShipRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public Ship findById(Integer id) throws ResourceNotFoundException {
        return repository.findByIdWithFetch(id);
    }

    @Override
    public List<Ship> findPage(int page, int size, String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, sort));
        return repository.findAll(pageable).getContent();
    }

    @Override
    public Integer getCountPage(int size) {
        double count = repository.count();
        return (int) Math.ceil(count / size);
    }

    @Override
    public Ship update(Ship ship) {
        ship.getShipCapacity().setRegNum(ship.getId());
        ship.getShipDimensions().setRegNum(ship.getId());
        ship.getShipEngine().setRegNum(ship.getId());
        return repository.update(ship);
    }

    @Override
    public void deleteAllById(List<Integer> listId) {
        repository.deleteAllById(listId);
    }

    @Override
    public List<Ship> getAllById(List<Integer> listId) {
        return repository.findAllByIdWithFetch(listId);
    }
}
