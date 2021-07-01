package com.example.ship.service.impl;

import com.example.ship.repository.FilterRepository;
import com.example.ship.response.*;
import com.example.ship.service.FilterService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FilterServiceImpl implements FilterService {

	private final FilterRepository<CapacityFilter> capacityRepository;
	private final FilterRepository<ShipFilter> shipRepository;
	private final FilterRepository<DimensionsFilter> dimensionsRepository;
	private final FilterRepository<EnginesFilter> enginesRepository;

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
