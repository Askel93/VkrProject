package com.example.ship.repository.impl.spec;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ListCriteria<T> {
	private List<T> listId;
}
