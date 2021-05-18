package com.example.ship.response;

import com.example.ship.model.OwnOperator;
import com.example.ship.model.Ship;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class JmsResponse implements Serializable {

	private static final long serialVersionUID = -9142755581211763735L;

	List<Ship> ships;
	List<OwnOperator> ownOperators;
}
