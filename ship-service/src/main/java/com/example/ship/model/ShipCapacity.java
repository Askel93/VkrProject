package com.example.ship.model;

import com.example.ship.config.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "ship_capacity")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonView(View.UI.class)
public class ShipCapacity {

	@Id
	@Column(name = "reg_num")
	private Integer regNum;

	@JsonView(View.REST.class)
	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "reg_num", referencedColumnName = "reg_num")
	private Ship ship;

	private Integer dedv;
	@Column(name = "pass_k")
	private Integer passK;
	@Column(name = "pass_p")
	private Integer passP;
	private Integer gt;
	private Integer nt;
}
