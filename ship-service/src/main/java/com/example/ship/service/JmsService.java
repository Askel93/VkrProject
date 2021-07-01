package com.example.ship.service;

import org.springframework.cache.annotation.CacheEvict;

import java.util.List;

public interface JmsService<T> {
	@CacheEvict(value = {"ships", "ownOperators", "filters"}, allEntries = true)
	<S extends T> List<S> saveAll(List<S> entities);
}
