package com.example.ship.repository.impl.spec;

import com.example.ship.model.Ship;
import com.example.ship.model.ShipEngine;
import lombok.Builder;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("NullableProblems")
@Builder
public class ShipListIdSpecification implements Specification<Ship> {

	private final List<Integer> listId;
	private final List<String> ownOperatorList;
	private final boolean withFetch;

	@Override
	public Predicate toPredicate(Root<Ship> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if (listId != null) {
			for (int id : listId) {
				predicates.add(builder.equal(root.get("id"), id));
			}
		}
		if (ownOperatorList != null) {
			for (String name : ownOperatorList) {
				predicates.add(builder.equal(root.get("ownName"), name));
				predicates.add(builder.equal(root.get("operatorName"), name));
			}
		}
		if (withFetch) {
			root.fetch("own", JoinType.LEFT);
			root.fetch("operator", JoinType.LEFT);
			root.fetch("shipCapacity");
			root.fetch("shipDimensions");
			Fetch<Ship, ShipEngine> engineFetch = root.fetch("shipEngine", JoinType.LEFT);
//			engineFetch.fetch("engine1", JoinType.LEFT);
//			engineFetch.fetch("engine2", JoinType.LEFT);
//			engineFetch.fetch("engine3", JoinType.LEFT);
		}
		return builder.or(predicates.toArray(new Predicate[] {}));
	}
}
