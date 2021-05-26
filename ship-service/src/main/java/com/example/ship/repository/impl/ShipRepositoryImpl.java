package com.example.ship.repository.impl;

import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.model.Ship;
import com.example.ship.repository.ShipRepository;
import com.example.ship.repository.impl.spec.ListCriteria;
import com.example.ship.repository.impl.spec.SearchCriteria;
import com.example.ship.repository.impl.spec.ShipListIdSpecification;
import com.example.ship.repository.impl.spec.ShipSearchSpecification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@SuppressWarnings("NullableProblems")
@Slf4j
@Repository
public class ShipRepositoryImpl extends BaseRepositoryImpl<Ship, Integer> implements ShipRepository {
	public ShipRepositoryImpl(EntityManager em) {
		super(JpaEntityInformationSupport.getEntityInformation(Ship.class, em), em);
	}

	@Override
	@Transactional
	public long getCount(String searchText) {
		ShipSearchSpecification spec = new ShipSearchSpecification(new SearchCriteria(searchText));
		return super.count(spec);
	}

	@Override
	@Transactional
	public List<Ship> findAllWithSearch(Pageable pageable, String searchText) {
		ShipSearchSpecification spec = new ShipSearchSpecification(new SearchCriteria(searchText));
		return super.findAll(spec, pageable).getContent();
	}

	@Override
	@Transactional
	public List<Ship> findAllByIdWithFetch(List<Integer> listId) {
		ShipListIdSpecification spec = ShipListIdSpecification.builder()
				.withFetch(true)
				.shipListIdCriteria(new ListCriteria<>(listId))
				.build();

		return findAll(spec);
	}

	@Override
	@Transactional
	public List<Ship> findAllByOwnOperator(List<String> listId) {
		log.info("find by own");
		ShipListIdSpecification spec = ShipListIdSpecification.builder()
				.shipOwnOperatorCriteria(new ListCriteria<>(listId))
				.withFetch(true)
				.build();

		return super.findAll(spec);
	}

	@Override
	@Transactional
	public Optional<Ship> findById(Integer id) {
		ShipListIdSpecification spec = ShipListIdSpecification.builder()
				.withFetch(true)
				.shipListIdCriteria(new ListCriteria<>(List.of(id)))
				.build();
		return Optional.ofNullable(super.findAll(spec).get(0));
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