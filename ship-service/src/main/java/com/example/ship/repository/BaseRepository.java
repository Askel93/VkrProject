package com.example.ship.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface BaseRepository<T, ID> extends JpaRepository<T, ID> {
	/**
	 * Delete all entities with given id
	 * @param listId mus not be {@literal null}
	 */
	void deleteAllById(List<ID> listId);
}
