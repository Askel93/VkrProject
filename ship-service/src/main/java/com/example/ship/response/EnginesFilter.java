package com.example.ship.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EnginesFilter {
	private Integer minPwr;
	private Integer maxPwr;
}
