package com.example.excel.parser.impl;

import com.example.excel.model.Engine;
import com.example.excel.model.ParseResult;
import com.example.excel.parser.ExcelParserBase;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("SpellCheckingInspection")
@Component("enginesParser")
public class EnginesParser extends ExcelParserBase<List<Engine>> {

	@Override
	public ParseResult<List<Engine>> parse(Row row) {
		Engine engine1 = parseEngine(row, 0);
		Engine engine2 = parseEngine(row, 1);
		Engine engine3 = parseEngine(row, 2);

		List<Engine> engines = new ArrayList<>();
		engines.add(engine1);
		engines.add(engine2);
		engines.add(engine3);

		return new ParseResult<>(engines, "");
	}

	/**
	 * Parse {@link Engine} for the given {@link Row} and number engine
	 * @param row must not be {@literal null}.
	 * @param numDvig must not be {@literal null}. Number engine
	 * @return {@link Engine} or {@literal null}, if engine count is {@link Integer 0}
	 */
	private Engine parseEngine(Row row, int numDvig) {
		try {
			int eng = engineParse(row.getCell(ENGINE_INDEX[0] + numDvig));
			int engPwr = engineParse(row.getCell(ENGINE_INDEX[1] + numDvig));
			String dvig = textParser(row.getCell(ENGINE_INDEX[2] + numDvig));

			return new Engine(eng, engPwr, dvig);
		} catch (NullPointerException | NumberFormatException e) {
			return null;
		}
	}

	@Override
	public void parseToExcel(List<Engine> engines, Row row) {
		int sumPwr = 0;
		for (int i = 0; i < engines.size(); i++) {
			parseEngine(row, i, engines.get(i));
			sumPwr += engines.get(i) == null ? 0 : engines.get(i).getPwr() * engines.get(i).getCount();
		}

		parser(row.createCell(ENGINE_INDEX[3]), sumPwr);
	}

	private void parseEngine(Row row, int numDvig, Engine engine) {
		int eng;
		int pwr;
		String dvig;
		if (engine == null) {
			eng = 0;
			pwr = 0;
			dvig = "null";
		} else {
			eng = engine.getCount();
			pwr = engine.getPwr();
			dvig = engine.getDvig();
		}
		parser(row.createCell(ENGINE_INDEX[0] + numDvig), eng);
		parser(row.createCell(ENGINE_INDEX[1] + numDvig), pwr);
		parser(row.createCell(ENGINE_INDEX[2] + numDvig), dvig);
	}
}
