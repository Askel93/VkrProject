package com.example.ship.controller;

import com.example.ship.model.Ship;
import com.example.ship.response.BaseResponse;
import com.example.ship.response.ShipResponse;
import com.example.ship.service.ShipService;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class ShipInitController extends ControllerTest {

	@Autowired
	protected ShipService service;
	@Autowired
	protected BaseResponse<ShipResponse, Ship> response;

	@Autowired
	protected CacheManager cacheManager;

	protected static int count = 0;

	public ShipInitController() {
		count = (int) Math.ceil(((double) ships.size()) / 2.0);
	}
}
