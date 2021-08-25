package com.example.ship.repository;

import com.example.ship.model.Ship;
import com.example.ship.response.Filter;
import com.example.ship.response.Filters;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface ShipRepository extends BaseRepository<Ship, Integer> {
	/**
	 * Update {@link Ship}
	 * @param ship must not be {@literal null}
	 * @throws com.example.ship.exception.ResourceNotFoundException if ship with given id not exists
	 * @return updated ship
	 */
	Ship update(Ship ship);

	List<Ship> findAllByIdWithFetch(List<Integer> listId);

	List<Ship> findAllByOwnOperator(List<String> listId);

	long getCount(Filter filter);

	List<Ship> findAllWithSearch(Pageable pageable, Filter filter);
}
