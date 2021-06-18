package com.example.ship.response;

import com.example.ship.config.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@SuppressWarnings("SpellCheckingInspection")
@Data
@NoArgsConstructor
@JsonView(View.REST.class)
public class Filters {
	/*
	* Ship filter
	*/
	private Integer ns;
	private Integer xs;
	private Integer ng;
	private Integer xg;
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

	public boolean isShipFilterEmpty() {
		return ts == null
				&& ns == null
				&& ng == null
				&& ps == null;
	}

	public boolean isCapacityFilterEmpty() {
		return nd == null
				&& xd == null
				&& npk == null
				&& xpk == null
				&& npp == null
				&& xpp == null
				&& nnt == null
				&& xnt == null
				&& ngt == null
				&& xgt == null;
	}

	public boolean isDimensionsFilterEmpty() {
		return ndp == null
				&& xdp == null
				&& nl == null
				&& xl == null
				&& nb == null
				&& xb == null
				&& ndt == null
				&& xdt == null
				&& ndh == null
				&& xdh == null;
	}

	public boolean isEnginesFilterEmpty() {
		return npwr == null && xpwr == null;
	}
}
