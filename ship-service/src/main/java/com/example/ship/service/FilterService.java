package com.example.ship.service;

import com.example.ship.response.Filters;
import org.springframework.cache.annotation.Cacheable;

public interface FilterService {
	@Cacheable(value = "filters")
	Filters getFilters();
}
