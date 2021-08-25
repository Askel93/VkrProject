package com.example.ship.response;

import com.example.ship.model.Ship;
import com.example.ship.model.ShipEngine;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class EnginesFilter implements Filter {
	private Integer minPwr;
	private Integer maxPwr;

	@Override
	public Specification<Ship> getSpecification() {
		return (root, query, builder) -> {
			List<Predicate> predicates = new ArrayList<>();
			if (minPwr != null) {
				Join<Ship, ShipEngine> join = root.join("shipEngine");
				return builder.between(join.get("sumPwr"), minPwr, maxPwr);
			}
			return null;
		};
	}
}
