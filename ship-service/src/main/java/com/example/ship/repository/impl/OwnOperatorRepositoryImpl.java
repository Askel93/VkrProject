package com.example.ship.repository.impl;

import com.example.ship.model.OwnOperator;
import com.example.ship.repository.OwnOperatorRepository;
import com.example.ship.repository.impl.spec.OwnOperatorSearchSpecification;
import com.example.ship.repository.impl.spec.SearchCriteria;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@SuppressWarnings("NullableProblems")
@Repository
public class OwnOperatorRepositoryImpl extends BaseRepositoryImpl<OwnOperator, String> implements OwnOperatorRepository {

	public static final String INSERT_QUERY = "INSERT INTO own_operator (name, address, phones, email, fax) " +
			"VALUES (:name, :address, CAST(STRING_TO_ARRAY(:phones, ',') as TEXT[]), :email, CAST(STRING_TO_ARRAY(:fax, ',') as TEXT[])) " +
			"ON CONFLICT DO NOTHING";

	public OwnOperatorRepositoryImpl(EntityManager entityManager) {
		super(JpaEntityInformationSupport.getEntityInformation(OwnOperator.class, entityManager), entityManager);
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
		return em.merge(ownOperator);
	}

	@Override
	@Transactional
	public List<OwnOperator> findAllWithSearch(Pageable pageable, String searchText) {
		OwnOperatorSearchSpecification spec = new OwnOperatorSearchSpecification(new SearchCriteria(searchText));
		return super.findAll(spec, pageable).getContent();
	}

	@Override
	@Transactional
	public long getCount(String searchText) {
		OwnOperatorSearchSpecification spec = new OwnOperatorSearchSpecification(new SearchCriteria(searchText));
		return super.count(spec);
	}
}