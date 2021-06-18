package com.example.ship.repository;

import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface FilterRepository<T> {
	T getFilters();
}
