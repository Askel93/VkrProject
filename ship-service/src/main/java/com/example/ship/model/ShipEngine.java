package com.example.ship.model;

import com.example.ship.response.EnginesFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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
public class ShipEngine {

	@Id
	@Column(name = "reg_num")
	private int regNum;
	@JsonIgnore
	@OneToOne(optional = false )
	@JoinColumn(name = "reg_num", referencedColumnName = "reg_num")
	private Ship ship;

	@OneToMany(
			cascade = CascadeType.MERGE,
			mappedBy = "shipEngine",
			orphanRemoval = true,
			fetch = FetchType.EAGER
	)
	private List<Engine> engines;

	@Column(name = "sum_pwr")
	private int sumPwr;

	public ShipEngine(int regNum) {
		this.regNum = regNum;
	}


	public void setEngines(List<Engine> engines) {
		this.engines = engines;
		setShipEngineToEngines();
	}

	public void setShipEngineToEngines() {
		if (engines != null) engines.forEach(engine -> engine.setShipEngine(this));
		editSumPwr();
	}

	@JsonIgnore
  private void editSumPwr() {
		sumPwr =  0;
		if (engines == null) return;
		engines.forEach(engine -> sumPwr += engine.getPwr() * engine.getCount());
	}
}
