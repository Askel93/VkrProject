package com.example.ship.response;

import com.example.ship.model.Ship;
import com.example.ship.model.ShipCapacity;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class CapacityFilter implements Filter {
	private Integer minDedv;
	private Integer maxDedv;
	private Integer minPassK;
	private Integer maxPassK;
	private Integer minPassP;
	private Integer maxPassP;
	private Integer minNt;
	private Integer maxNt;
	private Integer minGt;
	private Integer maxGt;

	@Override
	public Specification<Ship> getSpecification() {
		return (root, query, builder) -> {
			List<Predicate> capacityPredicates = new ArrayList<>();

			Join<Ship, ShipCapacity> join = root.join("shipCapacity");
			if (minDedv != null) {
				capacityPredicates.add(builder.between(join.get("dedv"), minDedv, maxDedv));
			}
			if (minPassK != null) {
				capacityPredicates.add(builder.between(join.get("passK"), minPassK, maxPassK));
			}
			if (minPassP != null) {
				capacityPredicates.add(builder.between(join.get("passP"), minPassP, maxPassP));
			}
			if (minGt != null) {
				capacityPredicates.add(builder.between(join.get("gt"), minGt, maxGt));
			}
			if (minNt != null) {
				capacityPredicates.add(builder.between(join.get("nt"), minNt, maxGt));
			}
			return builder.and(capacityPredicates.toArray(new Predicate[] {}));
		};
	}
}
