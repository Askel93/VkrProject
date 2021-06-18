package com.example.ship.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DimensionsFilter {
	private Integer minDisp;
	private Integer maxDisp;
	private Double minLength;
	private Double maxLength;
	private Double minBreadth;
	private Double maxBreadth;
	private Double minDraught;
	private Double maxDraught;
	private Double minDepth;
	private Double maxDepth;
}
