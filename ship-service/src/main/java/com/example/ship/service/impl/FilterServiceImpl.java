package com.example.ship.service.impl;

import com.example.ship.repository.FilterRepository;
import com.example.ship.response.*;
import com.example.ship.service.FilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FilterServiceImpl implements FilterService {

	@Autowired
	private FilterRepository<CapacityFilter> capacityRepository;
	@Autowired
	private FilterRepository<ShipFilter> shipRepository;
	@Autowired
	private FilterRepository<DimensionsFilter> dimensionsRepository;
	@Autowired
	private FilterRepository<EnginesFilter> enginesRepository;

	@Override
	public Filters getFilters() {
		var filter = new Filters();
		filter.fromShipFilter(shipRepository.getFilters());
		filter.fromCapacityFilter(capacityRepository.getFilters());
		filter.fromDimensionsFilter(dimensionsRepository.getFilters());
		filter.fromEnginesFilter(enginesRepository.getFilters());
		return filter;
	}
}
