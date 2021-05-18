package com.example.excel.response;

import com.example.excel.model.OwnOperator;
import com.example.excel.model.Ship;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
public class JmsResponse implements Serializable {

	private static final long serialVersionUID = -9142755581211763735L;

	private List<Ship> ships;
	private List<OwnOperator> ownOperators;
}
