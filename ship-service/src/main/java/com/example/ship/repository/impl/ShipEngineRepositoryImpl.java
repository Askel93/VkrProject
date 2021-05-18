package com.example.ship.repository.impl;

import com.example.ship.model.ShipEngine;
import com.example.ship.repository.ShipEngineRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@SuppressWarnings("NullableProblems")
@Repository
public class ShipEngineRepositoryImpl extends BaseRepositoryImpl<ShipEngine, Integer> implements ShipEngineRepository {


	public ShipEngineRepositoryImpl(EntityManager em) {
		super(JpaEntityInformationSupport.getEntityInformation(ShipEngine.class, em), em);
	}

	@Override
	@Transactional
	public <S extends ShipEngine> S save(S entity) {
		try {
			em.persist(entity);
		} catch (DataIntegrityViolationException | ConstraintViolationException ignored) {}
		return entity;
	}
}
