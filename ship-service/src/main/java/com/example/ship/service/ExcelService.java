package com.example.ship.service;

import com.example.ship.model.Ship;

import java.util.List;

public interface ExcelService {

	List<Ship> getAllById(List<Integer> listId);

	List<Ship> getAllByOwnOperator(List<String> listId);
}
