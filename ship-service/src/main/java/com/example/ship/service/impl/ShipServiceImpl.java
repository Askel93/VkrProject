package com.example.ship.service.impl;

import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.model.Ship;
import com.example.ship.repository.ShipRepository;
import com.example.ship.response.Filters;
import com.example.ship.service.ExcelService;
import com.example.ship.service.JmsService;
import com.example.ship.service.ShipService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@SuppressWarnings("unused")
@Service
public class ShipServiceImpl
    extends BaseServiceImpl<Ship, Integer>
    implements ShipService, JmsService<Ship>, ExcelService {

    private final ShipRepository repository;

    public ShipServiceImpl(ShipRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    @Cacheable(value = "ships", key = "#id")
    public Ship findById(Integer id) throws ResourceNotFoundException {
        return super.findById(id);
    }

    @Override
    public List<Ship> findPage(int page, int size, String sort, String searchText, Filters filters) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, sort));
        return repository.findAllWithSearch(pageable, searchText, filters);
    }

    @Override
    public Integer getCountPage(int size, String searchText, Filters filters) {
        double count = repository.getCount(searchText, filters);
        return (int) Math.ceil(count / size);
    }

    @Override
    @Caching(
        put = {
            @CachePut(value = "ships", key = "#ship.id")
        },
        evict = {
            @CacheEvict(value = "ownOperators", key = "#ship.ownName", condition = "#ship.ownName!=null"),
            @CacheEvict(value = "ownOperators", key = "#ship.operatorName", condition = "#ship.operatorName!=null"),
            @CacheEvict(value = "filters", allEntries = true)
        }
    )
    public <S extends Ship> S save(S ship) {
        return super.save(ship);
    }

    @Override
    public <S extends Ship> List<S> saveAll(List<S> entities) {
        return repository.saveAll(entities);
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
    @Caching(
        evict = {
            @CacheEvict(value = "ships", key = "#id"),
            @CacheEvict(value = "filters", allEntries = true)
        }
    )
    public void deleteById(Integer id) throws ResourceNotFoundException {
        super.deleteById(id);
    }

    @Override
    public List<Ship> getAllById(List<Integer> listId) {
        return repository.findAllByIdWithFetch(listId);
    }

    @Override
    public List<Ship> getAllByOwnOperator(List<String> listId) {
        return repository.findAllByOwnOperator(listId);
    }
}
