package com.example.ship.service.impl;

import com.example.ship.model.ShipEngine;
import com.example.ship.repository.BaseRepository;
import com.example.ship.service.ShipEngineService;
import org.springframework.stereotype.Service;

@Service
public class ShipEngineServiceImpl extends BaseServiceImpl<ShipEngine, Integer> implements ShipEngineService {


	public ShipEngineServiceImpl(BaseRepository<ShipEngine, Integer> baseRepository) {
		super(baseRepository);
	}
}
