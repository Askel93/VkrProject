package com.example.ship.repository.impl;

import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.model.OwnOperator;
import com.example.ship.model.Ship;
import com.example.ship.repository.OwnOperatorRepository;
import com.example.ship.repository.impl.spec.OwnOperatorIsNewSpecification;
import com.example.ship.repository.impl.spec.OwnOperatorSearchSpecification;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;
import java.util.Optional;

@SuppressWarnings("NullableProblems")
@Repository
@Transactional(readOnly = true)
public class OwnOperatorRepositoryImpl extends BaseRepositoryImpl<OwnOperator, String> implements OwnOperatorRepository {

	public static final String INSERT_QUERY = "INSERT INTO own_operator (name, address, phones, email, fax) " +
			"VALUES (:name, :address, CAST(STRING_TO_ARRAY(:phones, ',') as TEXT[]), :email, CAST(STRING_TO_ARRAY(:fax, ',') as TEXT[])) " +
			"ON CONFLICT DO NOTHING";
	private static final String UPDATE_SHIP_ON_RM_OWN = "UPDATE Ship s set s.ownName = NULL where s.ownName = :ownName ";
	private static final String UPDATE_SHIP_ON_RM_OPERATOR = "UPDATE Ship s set s.operatorName = NULL where s.operatorName = :operatorName ";
	private static final String GET_SHIPS_OWN = "SELECT s from Ship s where ownName = :ownName";
	private static final String GET_SHIPS_OPERATOR = "SELECT s from Ship s where operatorName = :operatorName";

	public OwnOperatorRepositoryImpl(EntityManager entityManager) {
		super(JpaEntityInformationSupport.getEntityInformation(OwnOperator.class, entityManager), entityManager);
	}

	@Override
	public Optional<OwnOperator> findById(String name) {
		var res = em.find(OwnOperator.class, name);
		if (res == null) return Optional.empty();

		var shipsOwn = em.createQuery(GET_SHIPS_OWN, Ship.class)
				.setParameter("ownName", name)
				.getResultList();
		var shipsOperator = em.createQuery(GET_SHIPS_OPERATOR, Ship.class)
				.setParameter("operatorName", name)
				.getResultList();
		res.setShipsOperator(shipsOperator);
		res.setShipsOwn(shipsOwn);
		return Optional.of(res);
	}

	@Override
	@Transactional
	public void deleteById(String name) {
		OwnOperator deleteOwnOperator = em.find(OwnOperator.class, name);
		if (deleteOwnOperator == null) {
			throw new ResourceNotFoundException(String.format("OwnOperator with id %s not exists", name));
		}
		em.createQuery(UPDATE_SHIP_ON_RM_OWN)
				.setParameter("ownName", deleteOwnOperator.getName())
				.executeUpdate();
		em.createQuery(UPDATE_SHIP_ON_RM_OPERATOR)
				.setParameter("operatorName", deleteOwnOperator.getName())
				.executeUpdate();

		super.delete(deleteOwnOperator);
	}

	@Override
	@Transactional
	public <S extends OwnOperator> S save(S entity) {
		Query query =  em.createNativeQuery(INSERT_QUERY);
		query.setParameter("name", entity.getName());
		query.setParameter("address", entity.getAddress());
		query.setParameter("phones", entity.getPhonesAsString());
		query.setParameter("email", entity.getEmail());
		query.setParameter("fax", entity.getFaxAsString());
		query.executeUpdate();
		return entity;
	}

	@Override
	@Transactional
	public OwnOperator update(OwnOperator ownOperator) {
		if (isNew(ownOperator.getName()))
			throw new ResourceNotFoundException(String.format("OwnOperator with id %s not exists", ownOperator.getName()));
		return em.merge(ownOperator);
	}

	@Override
	public List<OwnOperator> findAllWithSearch(Pageable pageable, String searchText) {
		OwnOperatorSearchSpecification spec = new OwnOperatorSearchSpecification(searchText);
		return super.findAll(spec, pageable).getContent();
	}

	@Override
	public long getCount(String searchText) {
		OwnOperatorSearchSpecification spec = new OwnOperatorSearchSpecification(searchText);
		return super.count(spec);
	}

	private boolean isNew(String name) {
		return super.count(new OwnOperatorIsNewSpecification(name)) == 0;
	}
}
