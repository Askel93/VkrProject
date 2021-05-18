package com.example.excel.service.impl;

import com.example.excel.client.ShipClient;
import com.example.excel.controller.JmsProducer;
import com.example.excel.model.OwnOperator;
import com.example.excel.model.ParseModel;
import com.example.excel.model.Ship;
import com.example.excel.parser.BaseParser;
import com.example.excel.response.JmsResponse;
import com.example.excel.response.ListResponse;
import com.example.excel.service.ExcelService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ExcelServiceImpl implements ExcelService {

	@Resource(name = "excelParser")
	private BaseParser<ParseModel> parser;

	@Autowired
	private JmsProducer jmsProducer;

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	private ShipClient client;

	@Override
	public String parser(MultipartFile file) {
		StringBuilder errorString = new StringBuilder();
		try(Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
			Sheet sheet = workbook.getSheetAt(0);
			Map<Integer, Ship> shipMap = new HashMap<>();
			Map<String, OwnOperator> ownOperatorMap = new HashMap<>();
			log.info("start parsing");

			for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i ++) {
				final Row row = sheet.getRow(i);
				var res = parser.parse(row);
				if (res.getT() != null) {
					var ship = res.getT().getShip();
					shipMap.putIfAbsent(ship.getId(), ship);
					ownOperatorMap.putAll(res.getT().getOwnOperators());
				}
				errorString.append(res.getError());

				if (i == sheet.getPhysicalNumberOfRows() - 1) {
					log.info("row number - {}", i);

					final List<OwnOperator> ownOperators = new ArrayList<>(ownOperatorMap.values());
					final List<Ship> ships = new ArrayList<>(shipMap.values());

					jmsProducer.send(new JmsResponse(ships, ownOperators));

					ownOperatorMap.clear();
					shipMap.clear();
				}
			}
			return errorString.toString();
		} catch (IOException e) {
			return e.getMessage();
		}
	}

	@Override
	public XSSFWorkbook downloadExcel(ListResponse listResponse) throws Exception {
		try {
			log.info("parse to excel, {}", listResponse.toString());

			var response = client.getAllById(listResponse);
			var ships = mapper.convertValue(response, new TypeReference<List<Ship>>() {});

			log.info("{}", ships.size());

			XSSFWorkbook workbook = new XSSFWorkbook();

			XSSFSheet sheet = workbook.createSheet("Ships");
			for (var i = 0; i < ships.size(); i++) {
				ParseModel parseModel = ParseModel.builder().ship(ships.get(i)).build();
				Row row = sheet.createRow(i);
				parser.parseToExcel(parseModel, row);
			}
			return workbook;
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
}
/*
*
*

* */