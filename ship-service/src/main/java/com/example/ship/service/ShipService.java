package com.example.ship.service;

import com.example.ship.model.Ship;

import java.util.List;

public interface ShipService extends BaseService<Ship, Integer> {
	List<Ship> findPage(int page, int size, String sort);
	Integer getCountPage(int size);
	Ship update(Ship ship);
	void deleteAllById(List<Integer> listId);
	List<Ship> getAllById(List<Integer> listId);
}
