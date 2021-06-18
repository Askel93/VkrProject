package com.example.ship.repository.impl;

import com.example.ship.model.ShipEngine;
import com.example.ship.repository.FilterRepository;
import com.example.ship.response.EnginesFilter;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

@Repository
@Transactional(readOnly = true)
public class ShipEngineRepositoryImpl
		extends BaseRepositoryImpl<ShipEngine, Integer>
		implements FilterRepository<EnginesFilter> {

	public ShipEngineRepositoryImpl(EntityManager em) {
		super(JpaEntityInformationSupport.getEntityInformation(ShipEngine.class, em), em);
	}

	@Override
	public EnginesFilter getFilters() {
		TypedQuery<EnginesFilter> query = em.createNamedQuery("enginesFilter", EnginesFilter.class);
		return query.getSingleResult();
	}
}
