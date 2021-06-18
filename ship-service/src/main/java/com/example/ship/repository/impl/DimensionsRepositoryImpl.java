package com.example.ship.repository.impl;

import com.example.ship.model.ShipDimensions;
import com.example.ship.repository.FilterRepository;
import com.example.ship.response.DimensionsFilter;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

@Repository
@Transactional(readOnly = true)
public class DimensionsRepositoryImpl
		extends BaseRepositoryImpl<ShipDimensions, Integer>
		implements FilterRepository<DimensionsFilter> {

	public DimensionsRepositoryImpl(EntityManager em) {
		super(JpaEntityInformationSupport.getEntityInformation(ShipDimensions.class, em), em);
	}

	@Override
	public DimensionsFilter getFilters() {
		TypedQuery<DimensionsFilter> query = em.createNamedQuery("dimensionsFilter", DimensionsFilter.class);
		return query.getSingleResult();
	}
}
