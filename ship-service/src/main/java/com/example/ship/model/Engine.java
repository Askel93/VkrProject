package com.example.ship.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "engine")
@Data
@NoArgsConstructor
public class Engine implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(
			name = "UUID",
			strategy = "org.hibernate.id.UUIDGenerator"
	)
	@JsonIgnore
	@Column(name = "id", columnDefinition = "uuid")
	private UUID id;
	@Column(name = "eng_count")
	private int count;
	@Column(name = "eng_pwr")
	private int pwr;
	@Column(name = "dvig")
	private String dvig;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ship_id", referencedColumnName = "reg_num")
	private ShipEngine shipEngine;

	public Engine(int count, int pwr, String dvig, ShipEngine shipEngine) {
		this.id = null;
		this.count = count;
		this.pwr = pwr;
		this.dvig = dvig;
		this.shipEngine = shipEngine;
	}

	public Engine(int count, int pwr, String dvig) {
		this(count, pwr, dvig, null);
	}
}
