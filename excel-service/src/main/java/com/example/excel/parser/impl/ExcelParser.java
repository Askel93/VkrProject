package com.example.excel.parser.impl;

import com.example.excel.model.*;
import com.example.excel.parser.ExcelParserBase;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;

@Component("excelParser")
@Slf4j
public class ExcelParser extends ExcelParserBase<ParseModel> {

	@Resource(name = "shipParser")
	private ExcelParserBase<Ship> shipParser;
	@Resource(name = "dimensionsParser")
	private ExcelParserBase<ShipDimensions> dimensionsParser;
	@Resource(name = "capacityParser")
	private ExcelParserBase<ShipCapacity> capacityParser;
	@Resource(name = "enginesParser")
	private ExcelParserBase<List<Engine>> enginesParser;
	@Resource(name = "ownOperatorParser")
	private ExcelParserBase<List<OwnOperator>> ownOperatorParser;

	@Override
	public ParseResult<ParseModel> parse(Row row) {
		try {
			StringBuilder errorString = new StringBuilder();
			ParseResult<Ship> shipResult = shipParser.parse(row);
			ParseResult<ShipCapacity> capacityResult = capacityParser.parse(row);
			ParseResult<ShipDimensions> dimensionsResult = dimensionsParser.parse(row);
			ParseResult<List<Engine>> enginesResult = enginesParser.parse(row);
			ParseResult<List<OwnOperator>> ownOperatorResult = ownOperatorParser.parse(row);
			if (shipResult.getT() == null) {
				throw new Exception(shipResult.getError());
			}
			Ship ship = shipResult.getT();

			var capacity = capacityResult.getT();
			errorString.append(capacityResult.getError());

			var dimensions = dimensionsResult.getT();
			errorString.append(dimensionsResult.getError());

			var engines = enginesResult.getT();
			errorString.append(enginesResult.getError());

			var ownOperators = ownOperatorResult.getT();
			errorString.append(ownOperatorResult.getError());

			ShipEngine shipEngine = new ShipEngine(ship, engines);

			capacity.setRegNum(ship.getId());
			dimensions.setRegNum(ship.getId());

			ship.setShipCapacity(capacity);
			ship.setShipDimensions(dimensions);
			ship.setOwnNameByOwn(ownOperators.get(0));
			ship.setOperatorNameByOperator(ownOperators.get(1));
			ship.setShipEngine(shipEngine);

			Map<String, OwnOperator> ownOperatorMap = new HashMap<>();
			ownOperators.stream()
					.filter(Objects::nonNull)
					.forEach(ownOperator ->
							ownOperatorMap.putIfAbsent(ownOperator.getName(), ownOperator));

			return new ParseResult<>(new ParseModel(ship, ownOperatorMap), errorString.toString());
		} catch (Exception e) {
			return new ParseResult<>(null, e.getMessage());
		}
	}

	public void parseToExcel(ParseModel parseModel, Row row) {
		Ship ship = parseModel.getShip();
		ShipCapacity capacity = ship.getShipCapacity();
		ShipDimensions dimensions = ship.getShipDimensions();
		ShipEngine shipEngine = ship.getShipEngine();

		var engines = shipEngine.getEngines();

		List<OwnOperator> ownOperators = new ArrayList<>();
		ownOperators.add(ship.getOwn());
		ownOperators.add(ship.getOperator());

		shipParser.parseToExcel(ship, row);
		capacityParser.parseToExcel(capacity, row);
		dimensionsParser.parseToExcel(dimensions, row);
		enginesParser.parseToExcel(engines, row);
		ownOperatorParser.parseToExcel(ownOperators, row);
	}
}
