package com.example.ship.repository.impl;

import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.model.Ship;
import com.example.ship.repository.ShipRepository;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ShipRepositoryImpl extends BaseRepositoryImpl<Ship, Integer> implements ShipRepository {
	public ShipRepositoryImpl(EntityManager em) {
		super(JpaEntityInformationSupport.getEntityInformation(Ship.class, em), em);
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

	@Override
	@Transactional
	public Ship findByIdWithFetch(Integer id) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Ship> query = findWithFetch(builder, List.of(id));

		TypedQuery<Ship> typedQuery = em.createQuery(query);

		try {
			return typedQuery.getSingleResult();
		} catch (NoResultException e) {
			throw new ResourceNotFoundException(String.format("Ship with id %s not exists", id));
		}
	}

	@Override
	@Transactional
	public void deleteAllById(List<Integer> listId) {
		for (int id : listId) {
			this.deleteById(id);
		}
	}

	@Override
	@Transactional
	public List<Ship> findAllByIdWithFetch(List<Integer> listId) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Ship> query = findWithFetch(builder, listId);

		TypedQuery<Ship> typedQuery = em.createQuery(query);

		return typedQuery.getResultList();
	}

	private CriteriaQuery<Ship> findWithFetch(CriteriaBuilder builder, List<Integer> listId) {
		CriteriaQuery<Ship> query = builder.createQuery(Ship.class);
		Root<Ship> root = query.from(Ship.class);
		root.fetch("shipCapacity");
		root.fetch("shipDimensions");
		root.fetch("shipEngine");
		root.fetch("own");
		root.fetch("operator");

		query.select(root);
		List<Predicate> predicates = new ArrayList<>();
		for (int id : listId) {
			predicates.add(builder.equal(root.get("id"), id));
		}
		Predicate predicate = builder.or(predicates.toArray(new Predicate[] {}));
		query.where(predicate);

		return query;
	}
}
