package com.example.ship.repository.impl;

import com.example.ship.exception.ResourceExistsException;
import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.model.Ship;
import com.example.ship.repository.FilterRepository;
import com.example.ship.repository.ShipRepository;
import com.example.ship.repository.impl.spec.ShipListIdSpecification;
import com.example.ship.repository.impl.spec.ShipSearchSpecification;
import com.example.ship.response.Filters;
import com.example.ship.response.ShipFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;

@SuppressWarnings({"NullableProblems", "unused"})
@Slf4j
@Repository
@Transactional(readOnly = true)
public class ShipRepositoryImpl
		extends BaseRepositoryImpl<Ship, Integer>
		implements ShipRepository, FilterRepository<ShipFilter> {

	private static final String DELETE_ENGINE_QUERY = "DELETE from Engine e where e.id = :id";

	public ShipRepositoryImpl(EntityManager em) {
		super(JpaEntityInformationSupport.getEntityInformation(Ship.class, em), em);
	}

	@Override
	@Transactional
	public <S extends Ship> S save(S ship) {
		if (isNew(ship.getId())) {
			var shipEngine = ship.getShipEngine();
			if (shipEngine != null) {
				shipEngine.setShipEngineToEngines();
			}
			em.merge(ship);
		} else {
			throw new ResourceExistsException(String.format("Ship with id %s already exists", ship.getId()));
		}
		return ship;
	}

	@Override
	@Transactional(noRollbackFor = ResourceNotFoundException.class)
	public Ship update(Ship ship) {

		if (isNew(ship.getId())) {
			throw new ResourceNotFoundException(String.format("Ship with id %s not exists", ship.getId()));
		} else {
			em.merge(ship);
		}
		return ship;
	}

	private boolean isNew(Integer id) {
		var spec = ShipListIdSpecification.builder()
				.listId(List.of(id))
				.build();

		return super.count(spec) == 0;
	}

	@Override
	public long getCount(String searchText, Filters filters) {
		ShipSearchSpecification spec = new ShipSearchSpecification(searchText, filters);
		return super.count(spec);
	}

	@Override
	public List<Ship> findAllWithSearch(Pageable pageable, String searchText, Filters filters) {
		ShipSearchSpecification spec = new ShipSearchSpecification(searchText, filters);
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
				.listId(listId)
				.build();

		return findAll(spec);
	}

	@Override
	public List<Ship> findAllByOwnOperator(List<String> listId) {
		log.info("find by own");
		ShipListIdSpecification spec = ShipListIdSpecification.builder()
				.ownOperatorList(listId)
				.withFetch(true)
				.build();

		return super.findAll(spec);
	}

	@Override
	public Optional<Ship> findById(Integer id) {

		log.info("find ship with id {}", id);

		ShipListIdSpecification spec = ShipListIdSpecification.builder()
				.withFetch(true)
				.listId(List.of(id))
				.build();

		TypedQuery<Ship> query = super.getQuery(spec, Sort.unsorted());

		try {
			return Optional.of(query.getSingleResult());
		} catch (NoResultException e) {
			return Optional.empty();
		}
	}
}