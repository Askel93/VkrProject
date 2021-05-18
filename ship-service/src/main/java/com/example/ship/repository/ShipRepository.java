package com.example.ship.repository;

import com.example.ship.model.Ship;
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

	Ship findByIdWithFetch(Integer id);

	void deleteAllById(List<Integer> listId);

	List<Ship> findAllByIdWithFetch(List<Integer> listId);
}
