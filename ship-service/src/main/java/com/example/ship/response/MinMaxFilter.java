package com.example.ship.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MinMaxFilter<T> {
	private T min;
	private T max;
}
