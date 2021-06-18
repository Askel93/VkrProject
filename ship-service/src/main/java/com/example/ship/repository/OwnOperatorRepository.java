package com.example.ship.repository;

import com.example.ship.model.OwnOperator;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface OwnOperatorRepository extends BaseRepository<OwnOperator, String> {
	OwnOperator update(OwnOperator ownOperator);

	List<OwnOperator> findAllWithSearch(Pageable pageable, String searchText);
	/**
	 * Get count with given given searchText
	 * @param searchText can be {@literal null}
	 */
	long getCount(String searchText);
}
