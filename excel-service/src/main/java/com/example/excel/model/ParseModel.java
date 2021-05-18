package com.example.excel.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParseModel {
	private Ship ship;
	private Map<String, OwnOperator> ownOperators;
}