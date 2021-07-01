package com.example.ship.model;

import com.example.ship.response.DimensionsFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@SqlResultSetMapping(name = "dimensionsFilterResult", classes = {
		@ConstructorResult(
				targetClass = DimensionsFilter.class,
				columns = {
						@ColumnResult(name = "minDisp", type = Integer.class),
						@ColumnResult(name = "maxDisp", type = Integer.class),
						@ColumnResult(name = "minLength", type = Double.class),
						@ColumnResult(name = "maxLength", type = Double.class),
						@ColumnResult(name = "minBreadth", type = Double.class),
						@ColumnResult(name = "maxBreadth", type = Double.class),
						@ColumnResult(name = "minDraught", type = Double.class),
						@ColumnResult(name = "maxDraught", type = Double.class),
						@ColumnResult(name = "minDepth", type = Double.class),
						@ColumnResult(name = "maxDepth", type = Double.class),
				})
})
@NamedNativeQuery(
		name = "dimensionsFilter",
		query = "Select min(d.disp) as minDisp, max(d.disp) as maxDisp, " +
				"min(d.length) as minLength, max(d.length) as maxLength, " +
				"min(d.breadth) as minBreadth, max(d.breadth) as maxBreadth, " +
				"min(d.draught) as minDraught, max(d.draught) as maxDraught, " +
				"min(d.depth) as minDepth, max(d.depth) as maxDepth " +
				"from ship_dimensions d",
		resultSetMapping = "dimensionsFilterResult"
)
@Entity
@Table(name = "ship_dimensions")
@Data
@NoArgsConstructor
public class ShipDimensions {

	@Id
	@Column(name = "reg_num")
	private int regNum;
	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "reg_num", referencedColumnName = "reg_num")
	private Ship ship;

	private Integer disp;
	@Column(name = "length", columnDefinition = "double precision")
	private double length;
	@Column(name = "breadth", columnDefinition = "double precision")
	private double breadth;
	@Column(name = "draught", columnDefinition = "double precision")
	private double draught;
	@Column(name = "depth", columnDefinition = "double precision")
	private double depth;
	@Column(name = "class", columnDefinition = "text")
	private String shipClass;

	public ShipDimensions(int regNum) {
		this.regNum = regNum;
	}
}
