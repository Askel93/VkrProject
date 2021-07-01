package com.example.ship.repository.impl.spec;

import com.example.ship.model.OwnOperator;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

@AllArgsConstructor
public class OwnOperatorIsNewSpecification implements Specification<OwnOperator> {

	private final String name;

	@Override
	public Predicate toPredicate(Root<OwnOperator> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		return builder.equal(root.get("name"), name);
	}
}
