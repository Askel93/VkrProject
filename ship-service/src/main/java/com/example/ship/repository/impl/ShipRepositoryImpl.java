package com.example.ship.repository.impl;

import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.model.Ship;
import com.example.ship.repository.FilterRepository;
import com.example.ship.repository.ShipRepository;
import com.example.ship.repository.impl.spec.ListCriteria;
import com.example.ship.repository.impl.spec.SearchCriteria;
import com.example.ship.repository.impl.spec.ShipListIdSpecification;
import com.example.ship.repository.impl.spec.ShipSearchSpecification;
import com.example.ship.response.Filters;
import com.example.ship.response.ShipFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@SuppressWarnings("NullableProblems")
@Slf4j
@Repository
@Transactional(readOnly = true)
public class ShipRepositoryImpl extends BaseRepositoryImpl<Ship, Integer> implements ShipRepository, FilterRepository<ShipFilter> {

	public ShipRepositoryImpl(EntityManager em) {
		super(JpaEntityInformationSupport.getEntityInformation(Ship.class, em), em);
	}

	@Override
	public long getCount(String searchText, Filters filters) {
		ShipSearchSpecification spec = new ShipSearchSpecification(new SearchCriteria(searchText), filters);
		return super.count(spec);
	}

	@Override
	public List<Ship> findAllWithSearch(Pageable pageable, String searchText, Filters filters) {
		ShipSearchSpecification spec = new ShipSearchSpecification(new SearchCriteria(searchText), filters);
		return super.findAll(spec, pageable).getContent();
	}

	@Override
	public ShipFilter getFilters() {
		TypedQuery<ShipFilter> query = em.createNamedQuery("shipFilter", ShipFilter.class);
		var filter = query.getSingleResult();
		List<String> typeFilter = em.createNamedQuery("typeFilter", String.class).getResultList();
		List<String> portFilter = em.createNamedQuery("portFilter", String.class).getResultList();
		filter.setTypeFilter(typeFilter);
		filter.setPortFilter(portFilter);
		return filter;
	}

	@Override
	public List<Ship> findAllByIdWithFetch(List<Integer> listId) {
		ShipListIdSpecification spec = ShipListIdSpecification.builder()
				.withFetch(true)
				.shipListIdCriteria(new ListCriteria<>(listId))
				.build();

		return findAll(spec);
	}

	@Override
	public List<Ship> findAllByOwnOperator(List<String> listId) {
		log.info("find by own");
		ShipListIdSpecification spec = ShipListIdSpecification.builder()
				.shipOwnOperatorCriteria(new ListCriteria<>(listId))
				.withFetch(true)
				.build();

		return super.findAll(spec);
	}

	@Override
	public Optional<Ship> findById(Integer id) {
		ShipListIdSpecification spec = ShipListIdSpecification.builder()
				.withFetch(true)
				.shipListIdCriteria(new ListCriteria<>(List.of(id)))
				.build();
		try {
			return Optional.ofNullable(super.findAll(spec).get(0));
		} catch (IndexOutOfBoundsException e) {
			return Optional.empty();
		}
	}

	@Override
	@Transactional
	public Ship update(Ship ship) {
		if (entityInformation.isNew(ship)) {
			throw new ResourceNotFoundException(String.format("Ship with id %s ", ship.getId()));
		} else {
			em.merge(ship);
		}
		return ship;
	}
}