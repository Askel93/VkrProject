package com.example.excel.parser;

import com.example.excel.model.OwnOperator;
import com.example.excel.model.ParseResult;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFFont;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@SuppressWarnings("SpellCheckingInspection")
@Slf4j
public abstract class ExcelParserBase<T> {

	protected static final int[] SHIP_INDEX = new int[]{0, 1, 2, 3, 4, 5, 6, 12, 13, 30};
	protected static final int[] ENGINE_INDEX = new int[]{14, 17, 20, 23};
	protected static final int[] OWN_INDEX = new int[]{31, 32, 33, 34, 35};
	protected static final int[] SHIP_CAPACITY_INDEX = new int[]{7, 8, 9, 10, 11};
	private static final Pattern phonePrefixPattern = Pattern.compile("(([+]?7)|8)([-\\s]?\\d{2,4}[-]?)");
	private static final String phonesPattern = "(?=(.*\\d){9,})([+]?.*[-\\s])([-\\s]?[(]?\\d{2,4}[)]?){4}\\D*";
	protected static final int[] SHIP_DIMENSIONS_INDEX = new int[]{24, 25, 26, 27, 28, 29};
	protected static final String[] HEADER = new String[] {
			"Name",
			"Naznachenie",
			"sub_nazn",
			"Reg_num",
			"IMO",
			"call_sign",
			"project",
			"dedv",
			"pass_k",
			"pass_p",
			"GT",
			"NT",
			"Port",
			"GodP",
			"eng1",
			"eng2",
			"eng3",
			"eng1pwr",
			"eng2pwr",
			"eng3pwr",
			"DVIG1",
			"DVIG2",
			"DVIG3",
			"sum_pwr",
			"Class",
			"disp",
			"Length",
			"Breadth"	,
			"Depth",
			"Draught",
			"Speed",
			"Own",
			"Own_address",
			"Own_phone",
			"Own_email",
			"Own_fax",
			"Operator",
			"Operator_address",
			"Operator_phone",
			"Operator_email",
			"Operator_fax"
	};
	protected Map<String, OwnOperator> ownOperatorMap = new HashMap<>();

	public boolean isOwnOperatorContains(String name) {
		if (ownOperatorMap.size() > 2000) {
			ownOperatorMap.clear();
			return false;
		}
		return ownOperatorMap.containsKey(name);
	}

	@SuppressWarnings("unused")
	public void createHeader(Row row, XSSFFont font) {
		font.setFontHeightInPoints((short)10);
		font.setFontName("Arial");
		font.setColor(IndexedColors.WHITE.getIndex());
		font.setBold(true);
		font.setItalic(false);
		CellStyle style = row.getRowStyle();
		style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		style.setAlignment(HorizontalAlignment.CENTER);
		style.setFont(font);
		for (var i = 0; i < HEADER.length; i++) {
			row.createCell(i).setCellValue(HEADER[i]);
		}
	}

	/**
	 * Parse {@link Row} to {@link T}
	 * @param row must not be {@literal null}
	 * @return {@link ParseResult}
	 */
	public abstract ParseResult<T> parse(Row row);

	/**
	 * Parse {@link T} to given {@link Row}
	 * @param t must not be {@literal null}
	 * @param row must not be {@literal null}
	 */
	public abstract void parseToExcel(T t, Row row);

	/**
	 * Parse {@link Cell} to {@link String idShip}
	 * @param cell can be {@literal null}.
	 * @return {@link String idShip}
	 * @throws NumberFormatException if failed parse to int
	 * @throws NullPointerException  if given {@link Cell} is {@literal null}
	 */
	public int regNumParser(Cell cell) throws NumberFormatException, NullPointerException {
		String input = parser(cell);
		var regNum = (int) Double.parseDouble(input);
		if (regNum < 0) throw new NumberFormatException();
		return regNum;
	}

	/**
	 * Parse {@link Cell} to {@link String own name}
	 * @param cell can be {@literal null}
	 * @return {@link String own name}
	 * @throws NullPointerException if given {@link Cell} is null or equals {@link String "null"}
	 */
	public String idOwnOperator(Cell cell) throws NullPointerException {
		String input = parser(cell);
		String res = input.trim();
		if (res.toLowerCase().equals("null")) {
			throw new NullPointerException();
		}
		return res;
	}

	/**
	 * Parse {@link Cell} to {@link String}
	 * @param cell can be {@literal null}
	 * @return parse {@link String} or {@literal null}, if {@link Cell} is null or equals {@link String "null"}
	 */
	public String textParser(Cell cell) {
		try {
			String input = parser(cell);
			String res = input.trim();
			if (res.toLowerCase().equals("null")) {
				return null;
			}
			return res;
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * Parse given {@link Cell} to String[] phones
	 * @param cell can be {@literal null}
	 * @return phones Array or empty array, if {@link Cell} is null
	 */
	public String[] phonesParser(Cell cell) {
		try {
			String input = parser(cell);
			String[] res = input.split(",");
			var phonePrefix = "";
			for (var i = 0; i < res.length; i++) {
				Matcher phonePrefixMatcher = phonePrefixPattern.matcher(res[i]);
				if (phonePrefixMatcher.find() && phonePrefix.equals("")) {
					phonePrefix = phonePrefixMatcher.group();
				}
				if (!res[i].matches(phonesPattern)) {
					res[i] = phonePrefix + res[i].trim();
				}
			}
			return Arrays.stream(res).map(String::trim).toArray(String[]::new);
		} catch (NullPointerException e) {
			return new String[]{};
		}
	}

	/**
	 * Parse {@link Cell} to {@link Integer}.
	 *
	 * @param cell can be {@literal null}.
	 * @return parse {@link Integer} or {@literal null}, if {@link Cell} is null or {@link Integer#parseInt} failed
	 */
	public Integer intParser(Cell cell) {
		try {
			String input = parser(cell);
			return (int) Double.parseDouble(input);
		} catch (NumberFormatException | NullPointerException e) {
			return null;
		}
	}

	/**
	 * Parse {@link Cell} to {@link Double}.
	 * @param cell can be {@literal null}.
	 * @return parse {@link Double} or {@literal null}, if {@link Cell} is null or {@link Double#parseDouble} failed
	 */
	public Double doubleParser(Cell cell) {
		try {
			String input = parser(cell);
			return Double.parseDouble(input);
		} catch (NumberFormatException | NullPointerException e) {
			return null;
		}
	}

	/**
	 * Parse {@link Cell} to {@link Integer count or power}
	 *
	 * @param cell can be {@literal null}
	 * @return {@link Integer}
	 * @throws NullPointerException  if {@link Cell} is null or {@link Integer 0}.
	 * @throws NumberFormatException if {@link Double#parseDouble} failed
	 */
	public Integer engineParse(Cell cell) throws NullPointerException, NumberFormatException {
		String input = parser(cell);
		int res = (int) Double.parseDouble(input);
		if (res == 0) {
			throw new NullPointerException();
		}
		return res;
	}

	/**
	 * Parse {@link Cell} to {@link String}
	 * @param cell can be {@literal null}.
	 * @return parse {@link String} or {@literal null}, if given {@link Cell} is null
	 */
	protected String parser(Cell cell) {
		StringBuilder res = new StringBuilder();
		try {
			switch (cell.getCellType()) {
				case STRING:
					res.append(cell.getStringCellValue());
					break;
				case NUMERIC:
					res.append(cell.getNumericCellValue());
					break;
				case FORMULA:
					res.append(cell.getCellFormula());
				default:
					break;
			}
			return res.toString();
		} catch (NullPointerException e) {
			return null;
		}
	}

	/**
	 * Parse given {@code T} to {@link Cell}
	 *
	 * @param cell must not be {@literal null}
	 * @param s can be {@literal null}
	 */
	protected <S> void parser(Cell cell, S s) {
		try {
			if (s == null) {
				cell.setCellValue("NULL");
				return;
			}
			if (s instanceof String) {
				cell.setCellValue((String) s);

			} else if (s instanceof Integer) {
				cell.setCellValue((Integer) s);
			} else if (s instanceof Double) {
				cell.setCellValue((Double) s);
			}
		} catch (NullPointerException ignored) {}
	}
}
