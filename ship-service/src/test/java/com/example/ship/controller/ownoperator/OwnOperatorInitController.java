package com.example.ship.controller.ownoperator;

import com.example.ship.controller.ControllerTest;
import com.example.ship.model.OwnOperator;
import com.example.ship.response.BaseResponse;
import com.example.ship.response.OwnOperatorResponse;
import com.example.ship.service.OwnOperatorService;
import org.springframework.beans.factory.annotation.Autowired;

public class OwnOperatorInitController extends ControllerTest {

	@Autowired
	protected OwnOperatorService service;

	@Autowired
	protected BaseResponse<OwnOperatorResponse, OwnOperator> response;

	protected static int count = 0;

	public OwnOperatorInitController() {
		count = (int) Math.ceil(((double) ownOperators.size()) / 2.0);
	}
}
