package com.example.ship.repository;

import com.example.ship.model.OwnOperator;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface OwnOperatorRepository extends BaseRepository<OwnOperator, String> {
	OwnOperator update(OwnOperator ownOperator);
}
