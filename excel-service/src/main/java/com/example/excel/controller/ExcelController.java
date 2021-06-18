package com.example.excel.controller;

import com.example.excel.response.ListResponse;
import com.example.excel.service.ExcelService;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.time.LocalTime;

@RestController
@Slf4j
public class ExcelController {

	@Autowired
	private ExcelService excelService;

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ResponseEntity<?> parseExcel(@RequestParam("file") MultipartFile file) {
		if (!file.isEmpty()) {

			final long start = LocalTime.now().toNanoOfDay();
			String resError = excelService.parser(file);
			final long end = LocalTime.now().minusNanos(start).toNanoOfDay();
			System.out.println(end);
			return ResponseEntity.status(201).body(resError);
		} else
			return ResponseEntity.badRequest().body("");
	}

	@RequestMapping(value = "/download", method = RequestMethod.POST)
	public ResponseEntity<?> downloadExcel(@RequestBody ListResponse<Integer> listResponse) {
		try {
			return download(excelService.downloadExcel(listResponse));
		} catch (Exception e) {
			return new ResponseEntity<>("error id load", null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/download/own", method = RequestMethod.POST)
	public ResponseEntity<?> downloadByOwnOperator(@RequestBody ListResponse<String> listResponse) {
		try {
			return download(excelService.downloadByOwnOperator(listResponse));
		} catch (Exception e) {
			return new ResponseEntity<>("error id load", null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private ResponseEntity<?> download(Workbook workbook) {
		try {
			ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
			HttpHeaders header = new HttpHeaders();
			var fileName = "fileName.xlsx";
			header.setContentType(new MediaType("application", "force-download"));
			header.set(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment; filename=%s", fileName));

			workbook.write(byteArrayOutputStream);
			workbook.close();
			return new ResponseEntity<>(new ByteArrayResource(byteArrayOutputStream.toByteArray()),
					header, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("error id load", null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}