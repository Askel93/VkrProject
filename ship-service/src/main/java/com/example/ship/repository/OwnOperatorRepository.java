package com.example.ship.repository;

import com.example.ship.model.OwnOperator;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface OwnOperatorRepository extends BaseRepository<OwnOperator, String> {
	OwnOperator update(OwnOperator ownOperator);

	List<OwnOperator> findAllWithSearch(Pageable pageable, String searchText);

	long getCount(String searchText);
}
