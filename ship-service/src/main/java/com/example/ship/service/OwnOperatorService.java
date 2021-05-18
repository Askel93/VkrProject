package com.example.ship.service;

import com.example.ship.model.OwnOperator;

import java.util.List;

public interface OwnOperatorService extends BaseService<OwnOperator, String> {
	OwnOperator update(OwnOperator ownOperator);
	List<OwnOperator> findPage(int page, int size, String sort);
	Integer getCountPage(int size);
}
