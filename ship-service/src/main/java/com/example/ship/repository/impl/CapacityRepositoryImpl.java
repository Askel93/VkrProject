package com.example.ship.repository.impl;

import com.example.ship.model.ShipCapacity;
import com.example.ship.repository.FilterRepository;
import com.example.ship.response.CapacityFilter;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
@Transactional(readOnly = true)
public class CapacityRepositoryImpl
		extends BaseRepositoryImpl<ShipCapacity, Integer>
		implements FilterRepository<CapacityFilter> {

	public CapacityRepositoryImpl(EntityManager em) {
		super(JpaEntityInformationSupport.getEntityInformation(ShipCapacity.class, em), em);
	}

	@Override
	public CapacityFilter getFilters() {
		return em.createNamedQuery("capacityFilter", CapacityFilter.class).getSingleResult();
	}
}
