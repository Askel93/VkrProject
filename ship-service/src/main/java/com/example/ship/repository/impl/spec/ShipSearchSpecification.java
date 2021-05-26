package com.example.ship.repository.impl.spec;

import com.example.ship.model.Ship;
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
public class ShipSearchSpecification implements Specification<Ship> {

	private final SearchCriteria criteria;

	@Override
	public Predicate toPredicate(Root<Ship> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		if (criteria.getSearchText().trim().equals("")) {
			return null;
		}
		List<Predicate> predicates = new ArrayList<>();
		var searchText = "%" + criteria.getSearchText().toUpperCase().trim() + "%";
		predicates.add(builder.like(builder.upper(root.get("ownName")), searchText));
		predicates.add(builder.like(builder.upper(root.get("operatorName")), searchText));
		predicates.add(builder.like(builder.upper(root.get("name")), searchText));
		predicates.add(builder.like(builder.upper(root.get("type")), searchText));
		predicates.add(builder.like(builder.upper(root.get("subType")), searchText));
//		predicates.add(builder.like(builder.function("TO_CHAR", String.class, root.get("id")), searchText));
		return builder.or(predicates.toArray(new Predicate[] {}));
	}
}
