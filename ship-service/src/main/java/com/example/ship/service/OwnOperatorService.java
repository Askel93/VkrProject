package com.example.ship.service;

import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.model.OwnOperator;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;

import java.util.List;

public interface OwnOperatorService extends BaseService<OwnOperator, String> {

	@CacheEvict(value = {"ownOperators", "ships"}, allEntries = true)
	OwnOperator update(OwnOperator ownOperator);

	List<OwnOperator> findPage(int page, int size, String sort, String searchText);

	Integer getCountPage(int size, String searchText);

	@CacheEvict(value = {"ownOperators", "ships", "filters"}, allEntries = true)
	void deleteAllById(List<String> listId);
}
