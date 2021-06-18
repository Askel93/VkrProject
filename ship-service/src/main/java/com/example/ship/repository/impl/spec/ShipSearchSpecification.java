package com.example.ship.repository.impl.spec;

import com.example.ship.model.Ship;
import com.example.ship.model.ShipCapacity;
import com.example.ship.model.ShipDimensions;
import com.example.ship.model.ShipEngine;
import com.example.ship.response.Filters;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("NullableProblems")
@AllArgsConstructor
public class ShipSearchSpecification implements Specification<Ship> {

	private final SearchCriteria criteria;
	private final Filters filters;


	@Override
	public Predicate toPredicate(Root<Ship> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		var searchText = criteria.getSearchText().toUpperCase().trim();
		if (!searchText.trim().equals("")) {
			searchText = "%" + searchText + "%";
			List<Predicate> searchPredicates = new ArrayList<>();
			searchPredicates.add(builder.like(builder.upper(root.get("ownName")), searchText));
			searchPredicates.add(builder.like(builder.upper(root.get("operatorName")), searchText));
			searchPredicates.add(builder.like(builder.upper(root.get("name")), searchText));
			searchPredicates.add(builder.like(builder.upper(root.get("type")), searchText));
			searchPredicates.add(builder.like(builder.upper(root.get("subType")), searchText));
			predicates.add(builder.or(searchPredicates.toArray(new Predicate[] {})));
		}
		if (!filters.isShipFilterEmpty()) {
			if (filters.getSpeed() != null) {
				predicates.add(builder.between(root.get("speed"), filters.getSpeed().getMin(), filters.getSpeed().getMax()));
			}
			if (filters.getType() != null) {
				List<Predicate> typePredicates = new ArrayList<>();
				filters.getType().forEach(type ->
						typePredicates.add(builder.equal(root.get("type"), type)));

				predicates.add(builder.or(typePredicates.toArray(new Predicate[] {})));
			}
			if (filters.getGodP() != null) {
				predicates.add(builder.between(root.get("godP"), filters.getGodP().getMin(), filters.getGodP().getMax()));
			}
			if (filters.getPort() != null) {
				List<Predicate> portPredicates = new ArrayList<>();
				filters.getPort().forEach(port ->
						portPredicates.add(builder.equal(root.get("port"), port)));
				predicates.add(builder.or(portPredicates.toArray(new Predicate[] {})));
			}
		}
		if (!filters.isCapacityFilterEmpty()) {
			Join<Ship, ShipCapacity> join = root.join("shipCapacity");
			if (filters.getNd() != null) {
				predicates.add(builder.between(join.get("dedv"), filters.getNd(), filters.getXd()));
			}
			if (filters.getNpk() != null) {
				predicates.add(builder.between(join.get("passK"), filters.getNpk(), filters.getXpk()));
			}
			if (filters.getNpp() != null) {
				predicates.add(builder.between(join.get("passP"), filters.getNpp(), filters.getXpp()));
			}
			if (filters.getNgt() != null) {
				predicates.add(builder.between(join.get("gt"), filters.getNgt(), filters.getXgt()));
			}
			if (filters.getNnt() != null) {
				predicates.add(builder.between(join.get("nt"), filters.getNnt(), filters.getXnt()));
			}
		}
		if (!filters.isDimensionsFilterEmpty()) {
			Join<Ship, ShipDimensions> join = root.join("shipDimensions");
			if (filters.getNdp() != null) {
				predicates.add(builder.between(join.get("disp"), filters.getNdp(), filters.getXdp()));
			}
			if (filters.getNl() != null) {
				predicates.add(builder.between(join.get("length"), filters.getNl(), filters.getXl()));
			}
			if (filters.getNb() != null) {
				predicates.add(builder.between(join.get("breadth"), filters.getNb(), filters.getXb()));
			}
			if (filters.getNdt() != null) {
				predicates.add(builder.between(join.get("draught"), filters.getNdt(), filters.getXdt()));
			}
			if (filters.getNdh() != null) {
				predicates.add(builder.between(join.get("depth"), filters.getNdh(), filters.getXdh()));
			}
		}
		if (!filters.isEnginesFilterEmpty()) {
			Join<Ship, ShipEngine> join = root.join("shipEngine");
			predicates.add(builder.between(join.get("sumPwr"), filters.getNpwr(), filters.getXpwr()));
		}
		return builder.and(predicates.toArray(new Predicate[] {}));
	}
}
