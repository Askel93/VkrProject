package com.example.excel.service;

import com.example.excel.model.Ship;
import com.example.excel.response.ListResponse;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

public interface ExcelService {
	/**
	 * Parse {@link File} to db
	 * @param file must not be {@literal null}
	 * @return {@link String}. Errors in parse
	 */
	String parser(MultipartFile file);
	/**
	 * Creates {@link XSSFWorkbook} for given {@link List}
	 * @param listResponse must not be {@literal null}. {@link List} id {@link Ship}
	 * @return {@link XSSFWorkbook}
	 */
	XSSFWorkbook downloadExcel(ListResponse<Integer> listResponse) throws Exception ;

	XSSFWorkbook downloadByOwnOperator(ListResponse<String> listResponse) throws Exception;
}
