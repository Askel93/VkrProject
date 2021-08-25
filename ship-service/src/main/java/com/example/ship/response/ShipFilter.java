package com.example.ship.response;

import com.example.ship.model.Ship;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class ShipFilter implements Filter {
	private Integer minSpeed;
	private Integer maxSpeed;
	private Integer minGodP;
	private Integer maxGodP;

	private List<String> typeFilter;
	private List<String> portFilter;

	public ShipFilter(Integer minSpeed, Integer maxSpeed, Integer minGodP, Integer maxGodP) {
		this(minSpeed, maxSpeed, minGodP, maxGodP, null, null);
	}

	@Override
	public Specification<Ship> getSpecification() {
		return (root, query, builder) -> {
			List<Predicate> filterPredicates = new ArrayList<>();
			if (minSpeed != null) {
				filterPredicates.add(builder.between(root.get("speed"), minSpeed, maxSpeed));
			}
			if (typeFilter != null) {
				List<Predicate> typePredicates = typeFilter
						.stream()
						.map(type ->
								builder.equal(root.get("type"), type))
						.collect(Collectors.toList());

				filterPredicates.add(builder.or(typePredicates.toArray(new Predicate[] {})));
			}
			if (portFilter != null) {
				List<Predicate> portPredicates = portFilter
						.stream()
						.map(port ->
								builder.equal(root.get("port"), port))
						.collect(Collectors.toList());
				filterPredicates.add(builder.or(portPredicates.toArray(new Predicate[] {})));
			}
			if (minGodP != null) {
				filterPredicates.add(builder.between(root.get("godP"), minGodP, maxGodP));
			}
			return builder.and(filterPredicates.toArray(new Predicate[] {}));
		};
	}
}
