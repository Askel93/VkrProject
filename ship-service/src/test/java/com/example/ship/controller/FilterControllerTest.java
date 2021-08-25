package com.example.ship.controller;

import com.example.ship.response.Filters;
import com.example.ship.service.FilterService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class FilterControllerTest extends ControllerTest {
	@Autowired
	private FilterService service;

	@Test
	void getFiltersSuccess() throws Exception {
		MvcResult mvcResult = mvc.perform(get("/filter/getFilters"))
				.andDo(print())
				.andExpect(status().isOk())
				.andReturn();

		var content = mvcResult.getResponse().getContentAsString();
		var filters = mapFromJson(content, Filters.class);
	}
}
