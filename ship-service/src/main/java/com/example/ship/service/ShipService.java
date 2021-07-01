package com.example.ship.service;

import com.example.ship.model.Ship;
import com.example.ship.response.Filters;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Caching;

import java.util.List;

public interface ShipService extends BaseService<Ship, Integer> {

	List<Ship> findPage(int page, int size, String sort, String searchText, Filters filters);

	Integer getCountPage(int size, String searchText, Filters filters);

	@Caching(
			put = @CachePut(value = "ships", key = "#ship.id"),
			evict = {
					@CacheEvict(value = "filters", allEntries = true),
					@CacheEvict(value = "ownOperators", key = "#ship.ownName", condition = "#ship.ownName!=null"),
					@CacheEvict(value = "ownOperators", key = "#ship.operatorName", condition = "#ship.operatorName!=null")
			}
	)
	Ship update(Ship ship);

	@CacheEvict(value = {"ships", "ownOperators", "filters"}, allEntries = true)
	void deleteAllById(List<Integer> listId);
}
