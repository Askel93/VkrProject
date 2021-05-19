package com.example.excel.parser;

import org.apache.poi.ss.usermodel.Cell;

import java.util.Arrays;

public abstract class ExcelParserBase {

	protected static final int[] SHIP_INDEX = new int[]{0, 1, 2, 3, 4, 5, 6, 12, 13, 30};
	protected static final int[] ENGINE_INDEX = new int[]{14, 17, 20, 23};
	protected static final int[] OWN_INDEX = new int[]{31, 32, 33, 34, 35};
	protected static final int[] SHIP_CAPACITY_INDEX = new int[]{7, 8, 9, 10, 11};
	protected static final int[] SHIP_DIMENSIONS_INDEX = new int[]{24, 25, 26, 27, 28, 29};

	/**
	 * Parse {@link Cell} to {@link String idShip}
	 * @param cell can be {@literal null}.
	 * @return {@link String idShip}
	 * @throws NumberFormatException if failed parse to int
	 * @throws NullPointerException  if given {@link Cell} is {@literal null}
	 */
	public int regNumParser(Cell cell) throws NumberFormatException, NullPointerException {
		String input = parser(cell);
		return (int) Double.parseDouble(input);
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
				case FORMULA:
					res.append(cell.getNumericCellValue());
					break;
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
	 * @param t can be {@literal null}
	 */
	protected <T> void parser(Cell cell, T t) {
		try {
			if (t == null) {
				cell.setCellValue("NULL");
				return;
			}
			if (t instanceof String) {
				cell.setCellValue((String) t);

			} else if (t instanceof Integer) {
				cell.setCellValue((Integer) t);
			} else if (t instanceof Double) {
				cell.setCellValue((Double) t);
			}
		} catch (NullPointerException ignored) {}
	}
}
