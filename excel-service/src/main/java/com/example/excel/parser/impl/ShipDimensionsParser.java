package com.example.excel.parser.impl;

import com.example.excel.model.ParseResult;
import com.example.excel.model.ShipDimensions;
import com.example.excel.parser.ExcelParserBase;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.stereotype.Component;

@SuppressWarnings("SpellCheckingInspection")
@Component("dimensionsParser")
public class ShipDimensionsParser extends ExcelParserBase<ShipDimensions> {


	@Override
	public ParseResult<ShipDimensions> parse(Row row) {
		try {
			Integer disp = intParser(row.getCell(SHIP_DIMENSIONS_INDEX[1]));
			Double length = doubleParser(row.getCell(SHIP_DIMENSIONS_INDEX[2]));
			Double breadth = doubleParser(row.getCell(SHIP_DIMENSIONS_INDEX[3]));
			Double depth = doubleParser(row.getCell(SHIP_DIMENSIONS_INDEX[4]));
			Double draught = doubleParser(row.getCell(SHIP_DIMENSIONS_INDEX[5]));
			String shipClass = textParser(row.getCell(SHIP_DIMENSIONS_INDEX[0]));
			var dimensions = ShipDimensions.builder()
					.breadth(breadth)
					.depth(depth)
					.disp(disp)
					.draught(draught)
					.length(length)
					.shipClass(shipClass)
					.build();
			return new ParseResult<>(dimensions, "");
		} catch (Exception e) {
			return new ParseResult<>(new ShipDimensions(), "error in shipDimensions " + row.getRowNum() + "\n");
		}
	}

	@Override
	public void parseToExcel(ShipDimensions shipDimensions, Row row) {
		parser(row.createCell(SHIP_DIMENSIONS_INDEX[0]), shipDimensions.getShipClass());
		parser(row.createCell(SHIP_DIMENSIONS_INDEX[1]), shipDimensions.getDisp());
		parser(row.createCell(SHIP_DIMENSIONS_INDEX[2]), shipDimensions.getLength());
		parser(row.createCell(SHIP_DIMENSIONS_INDEX[3]), shipDimensions.getBreadth());
		parser(row.createCell(SHIP_DIMENSIONS_INDEX[4]), shipDimensions.getDepth());
		parser(row.createCell(SHIP_DIMENSIONS_INDEX[5]), shipDimensions.getDraught());
	}
}
