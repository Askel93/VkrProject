package com.example.ship.response;

import com.example.ship.model.Ship;
import com.example.ship.model.ShipDimensions;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class DimensionsFilter implements Filter {
	private Integer minDisp;
	private Integer maxDisp;
	private Double minLength;
	private Double maxLength;
	private Double minBreadth;
	private Double maxBreadth;
	private Double minDraught;
	private Double maxDraught;
	private Double minDepth;
	private Double maxDepth;

	@Override
	public Specification<Ship> getSpecification() {
		return (root, query, builder) -> {
			List<Predicate> predicates = new ArrayList<>();
			Join<Ship, ShipDimensions> join = root.join("shipDimensions");
			if (minDisp != null) {
				predicates.add(builder.between(join.get("disp"), minDisp, maxDisp));
			}
			if (minLength != null) {
				predicates.add(builder.between(join.get("length"), minLength, maxLength));
			}
			if (minBreadth != null) {
				predicates.add(builder.between(join.get("breadth"), minBreadth, maxBreadth));
			}
			if (minDraught != null) {
				predicates.add(builder.between(join.get("draught"), minDraught, maxDraught));
			}
			if (minDepth != null) {
				predicates.add(builder.between(join.get("depth"), minDepth, maxDepth));
			}
			return builder.and(predicates.toArray(new Predicate[] {}));
		};
	}
}
