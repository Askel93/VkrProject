package com.example.ship.model;

import com.example.ship.config.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "engine")
@Data
@NoArgsConstructor
@JsonView(View.UI.class)
public class Engine {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(
			name = "UUID",
			strategy = "org.hibernate.id.UUIDGenerator"
	)
	@JsonView(View.REST.class)
	@Column(name = "id", columnDefinition = "uuid")
	private UUID id;
	@Column(name = "eng_count")
	private int count;
	@Column(name = "eng_pwr")
	private int pwr;
	@Column(name = "dvig", columnDefinition = "text")
	private String dvig;
}
