package com.example.ship.response;

import com.example.ship.config.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Builder;
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
	@JsonView(View.UI.class)
	private ShipFilterRes shipFilter;
	@JsonView(View.UI.class)
	private DimensionsFilterRes dimensionsFilter;
	@JsonView(View.UI.class)
	private CapacityFilterRes capacityFilter;

	@Data
	@Builder
	public static class ShipFilterRes {
		private MinMaxFilter<Integer> speed;
		private MinMaxFilter<Integer> godP;
		private List<String> type; //Type ship
		private List<String> port; //Port ship
	}
	private MinMaxFilter<Integer> speed;
	private MinMaxFilter<Integer> godP;
	private List<String> type; //Type ship
	private List<String> port; //Port ship

	/*
	* Capacity filter
	*/
	@Data
	@Builder
	public static class CapacityFilterRes {
		private MinMaxFilter<Integer> dedv;
		private MinMaxFilter<Integer> passK;
		private MinMaxFilter<Integer> passP;
		private MinMaxFilter<Integer> nt;
		private MinMaxFilter<Integer> gt;
	}
	private MinMaxFilter<Integer> dedv;
	private MinMaxFilter<Integer> passK;
	private MinMaxFilter<Integer> passP;
	private MinMaxFilter<Integer> nt;
	private MinMaxFilter<Integer> gt;

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
	@Data
	@Builder
	public static class DimensionsFilterRes {
		private MinMaxFilter<Integer> disp;
		private MinMaxFilter<Double> length;
		private MinMaxFilter<Double> breadth;
		private MinMaxFilter<Double> draught;
		private MinMaxFilter<Double> depth;
	}
	private MinMaxFilter<Integer> disp;
	private MinMaxFilter<Double> length;
	private MinMaxFilter<Double> breadth;
	private MinMaxFilter<Double> draught;
	private MinMaxFilter<Double> depth;
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
	private MinMaxFilter<Integer> sumPwr;
	private Integer npwr; //Min sum power
	private Integer xpwr; //Max sum power

	public void fromCapacityFilter(CapacityFilter filter) {
		capacityFilter = CapacityFilterRes.builder()
				.dedv(new MinMaxFilter<>(filter.getMinDedv(), filter.getMaxDedv()))
				.passK(new MinMaxFilter<>(filter.getMinPassK(), filter.getMaxPassK()))
				.passP(new MinMaxFilter<>(filter.getMinPassP(), filter.getMaxPassP()))
				.nt(new MinMaxFilter<>(filter.getMinNt(), filter.getMaxNt()))
				.gt(new MinMaxFilter<>(filter.getMinGt(), filter.getMaxGt()))
				.build();
	}
	public void fromShipFilter(ShipFilter filter) {
		shipFilter = ShipFilterRes.builder()
				.speed(new MinMaxFilter<>(filter.getMinSpeed(), filter.getMaxSpeed()))
				.godP(new MinMaxFilter<>(filter.getMinGodP(), filter.getMaxGodP()))
				.type(filter.getTypeFilter())
				.port(filter.getPortFilter())
				.build();
	}

	public void fromDimensionsFilter(DimensionsFilter filter) {
		dimensionsFilter = DimensionsFilterRes.builder()
				.disp(new MinMaxFilter<>(filter.getMinDisp(), filter.getMaxDisp()))
				.length(new MinMaxFilter<>(filter.getMinLength(), filter.getMaxLength()))
				.breadth(new MinMaxFilter<>(filter.getMinBreadth(), filter.getMaxBreadth()))
				.draught(new MinMaxFilter<>(filter.getMinDraught(), filter.getMaxDraught()))
				.depth(new MinMaxFilter<>(filter.getMinDepth(), filter.getMaxDepth()))
				.build();
	}

	public void fromEnginesFilter(EnginesFilter filter) {
		sumPwr = new MinMaxFilter<>(filter.getMinPwr(), filter.getMaxPwr());
	}

	public boolean isShipFilterEmpty() {
		return type == null
				&& speed == null
				&& godP == null
				&& port == null;
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
