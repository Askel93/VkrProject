package com.example.ship.response;

import com.example.ship.config.View;
import com.example.ship.model.Ship;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("SpellCheckingInspection")
@Data
@NoArgsConstructor
@JsonView(View.REST.class)
public class Filters implements Filter {

	private String search;
	/*
	* Ship filter
	*/
	private Integer ns; //Min speed
	private Integer xs; //Max speed
	private Integer ng; //Min god
	private Integer xg; //Max god
	private List<String> ts; //Type ship
	private List<String> ps; //Port ship

	/*
	* Capacity filter
	*/
	private Integer nd; //Min dead weight
	private Integer xd; //Max dead weight
	private Integer npk; //Min number of cabins
	private Integer xpk; //Max number of cabins
	private Integer npp; //Min passenger capacity
	private Integer xpp; //Max passenger capacity
	private Integer nnt; //Min net tonnage
	private Integer xnt; //Max net tonnage
	private Integer ngt; //Min gross tonnage
	private Integer xgt; //Max gross tonnage

	/*
	* Dimensions filter
	*/
	private Integer ndp; //Min displacement
	private Integer xdp; //Max displacement
	private Double nl; //Min length
	private Double xl; //Max length
	private Double nb; //Min breadth
	private Double xb; //Max breadth
	private Double ndt; //Min draught
	private Double xdt; //Max draught
	private Double ndh; //Min depth
	private Double xdh; //Max depth

	/*
	* Engines filter
	*/
	private Integer npwr; //Min sum power
	private Integer xpwr; //Max sum power

	public void fromCapacityFilter(CapacityFilter filter) {
		nd = filter.getMinDedv();
		xd = filter.getMaxDedv();
		npk = filter.getMinPassK();
		xpk = filter.getMaxPassK();
		npp = filter.getMinPassP();
		xpp = filter.getMaxPassP();
		nnt = filter.getMinNt();
		xnt = filter.getMaxNt();
		ngt = filter.getMinGt();
		xgt = filter.getMaxGt();
	}
	public void fromShipFilter(ShipFilter filter) {
		ts = filter.getTypeFilter();
		ps = filter.getPortFilter();
		ns = filter.getMinSpeed();
		xs = filter.getMaxSpeed();
		ng = filter.getMinGodP();
		xg = filter.getMaxGodP();
	}

	public void fromDimensionsFilter(DimensionsFilter filter) {
		ndp = filter.getMinDisp();
		xdp = filter.getMaxDisp();
		nl = filter.getMinLength();
		xl = filter.getMaxLength();
		nb = filter.getMinBreadth();
		xb = filter.getMaxBreadth();
		ndt = filter.getMinDraught();
		xdt = filter.getMaxDraught();
		ndh = filter.getMinDepth();
		xdh = filter.getMaxDepth();
	}

	public void fromEnginesFilter(EnginesFilter filter) {
		npwr = filter.getMinPwr();
		xpwr = filter.getMaxPwr();
	}

	private Specification<Ship> getShipFilter() {
		return new ShipFilter(ng, xg, ns, xs, ts, ps).getSpecification();
	}

	private Specification<Ship> getCapacityFilter() {
		return new CapacityFilter(nd, xd, npk, xpk, npp, xpp, nnt, xnt, ngt, xgt).getSpecification();
	}

	private Specification<Ship> getDimensionsFilter() {
		return new DimensionsFilter(ndp, xdp, nl, xl, nb, xb, ndt, xdt, ndh, xdh).getSpecification();
	}

	private Specification<Ship> getEnginesFilter() {
		return new EnginesFilter(npwr, xpwr).getSpecification();
	}

	private Specification<Ship> getSearchFilter() {
		return (root, query, builder) -> {
			if (search != null && !search.trim().equals("")) {
				var searchParam = "%" + search + "%";
				List<Predicate> searchPredicates = new ArrayList<>();
				searchPredicates.add(builder.like(builder.upper(root.get("ownName")), searchParam));
				searchPredicates.add(builder.like(builder.upper(root.get("operatorName")), searchParam));
				searchPredicates.add(builder.like(builder.upper(root.get("name")), searchParam));
				searchPredicates.add(builder.like(builder.upper(root.get("type")), searchParam));
				searchPredicates.add(builder.like(builder.upper(root.get("subType")), searchParam));
				return builder.or(searchPredicates.toArray(new Predicate[] {}));
			}
			return null;
		};
	}

	@Override
	@JsonIgnore
	public Specification<Ship> getSpecification() {
			return getShipFilter()
					.and(getSearchFilter())
					.and(getCapacityFilter())
					.and(getDimensionsFilter())
					.and(getEnginesFilter())
					;
	}
}
