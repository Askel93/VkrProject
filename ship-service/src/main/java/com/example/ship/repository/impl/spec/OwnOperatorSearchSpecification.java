package com.example.ship.repository.impl.spec;

import com.example.ship.model.OwnOperator;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("NullableProblems")
@AllArgsConstructor
public class OwnOperatorSearchSpecification implements Specification<OwnOperator> {

	private final SearchCriteria criteria;

	@Override
	public Predicate toPredicate(Root<OwnOperator> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		if (criteria.getSearchText().trim().equals("")) {
			return null;
		}
		var searchText = "%" + criteria.getSearchText().toUpperCase().trim() + "%";
		List<Predicate> predicates = new ArrayList<>();
		predicates.add(builder.like(builder.upper(root.get("name")), searchText));
		predicates.add(builder.like(builder.upper(root.get("address")), searchText));
		predicates.add(builder.like(builder.upper(root.get("email")), searchText));
		return builder.or(predicates.toArray(new Predicate[] {}));
	}
}
