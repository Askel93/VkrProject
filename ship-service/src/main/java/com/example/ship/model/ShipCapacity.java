package com.example.ship.model;

import com.example.ship.config.View;
import com.example.ship.response.CapacityFilter;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@SqlResultSetMapping(name = "capacityFilterResult", classes = {
		@ConstructorResult(
				targetClass = CapacityFilter.class,
				columns = {
						@ColumnResult(name = "minDedv", type = Integer.class),
						@ColumnResult(name = "maxDedv", type = Integer.class),
						@ColumnResult(name = "minPassK", type = Integer.class),
						@ColumnResult(name = "maxPassK", type = Integer.class),
						@ColumnResult(name = "minPassP", type = Integer.class),
						@ColumnResult(name = "maxPassP", type = Integer.class),
						@ColumnResult(name = "minNt", type = Integer.class),
						@ColumnResult(name = "maxNt", type = Integer.class),
						@ColumnResult(name = "minGt", type = Integer.class),
						@ColumnResult(name = "maxGt", type = Integer.class),
				})
})
@NamedNativeQuery(
		name = "capacityFilter",
		query = "Select min(s.dedv) as minDedv, max(s.dedv) as maxDedv, " +
				"min(s.pass_k) as minPassK, max(s.pass_k) as maxPassK, " +
				"min(s.pass_p) as minPassP, max(s.pass_p) as maxPassP, " +
				"min(s.nt) as minNt, max(s.nt) as maxNt, " +
				"min(s.gt) as minGt, max(s.gt) as maxGt " +
				"from ship_capacity s",
		resultSetMapping = "capacityFilterResult"
)
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
