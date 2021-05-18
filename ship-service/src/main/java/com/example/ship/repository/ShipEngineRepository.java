package com.example.ship.repository;

import com.example.ship.model.ShipEngine;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface ShipEngineRepository extends BaseRepository<ShipEngine, Integer> {
}
