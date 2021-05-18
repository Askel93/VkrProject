package com.example.ship.model;

import com.example.ship.config.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "ship_dimensions")
@Data
@NoArgsConstructor
@JsonView(View.UI.class)
public class ShipDimensions {

	@Id
	@Column(name = "reg_num")
	private int regNum;
	@JsonView(View.REST.class)
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
}
