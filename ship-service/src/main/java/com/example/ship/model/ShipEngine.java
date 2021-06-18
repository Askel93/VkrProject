package com.example.ship.model;

import com.example.ship.config.View;
import com.example.ship.response.EnginesFilter;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@SqlResultSetMapping(name = "enginesFilterResult", classes = {
		@ConstructorResult(
				targetClass = EnginesFilter.class,
				columns = {
						@ColumnResult(name = "minPwr", type = Integer.class),
						@ColumnResult(name = "maxPwr", type = Integer.class),
				})
})
@NamedNativeQuery(
		name = "enginesFilter",
		query = "Select min(e.sum_pwr) as minPwr, max(e.sum_pwr) as maxPwr " +
				"from ship_engine e",
		resultSetMapping = "enginesFilterResult"
)
@Entity
@Table(name = "ship_engine")
@Data
@NoArgsConstructor
@JsonView(View.UI.class)
public class ShipEngine {

	@Id
	@Column(name = "reg_num")
	private int regNum;
	@JsonView(View.REST.class)
	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "reg_num", referencedColumnName = "reg_num")
	private Ship ship;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "eng_1", referencedColumnName = "id", columnDefinition = "uuid")
	private Engine engine1;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "eng_2", referencedColumnName = "id", columnDefinition = "uuid")
	private Engine engine2;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "eng_3", referencedColumnName = "id", columnDefinition = "uuid")
	private Engine engine3;

	@Column(name = "sum_pwr")
	private int sumPwr;
}
