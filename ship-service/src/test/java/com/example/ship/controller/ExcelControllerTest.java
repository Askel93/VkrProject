package com.example.ship.controller;

import com.example.ship.config.WithMockOAuth2Scope;
import com.example.ship.model.Ship;
import com.example.ship.response.ListResponse;
import com.example.ship.response.ShipResponse;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
public class ExcelControllerTest extends ControllerTest {

	private final List<Integer> listId = ships.stream().map(Ship::getId).collect(Collectors.toList());

	@Test
	@WithMockOAuth2Scope(scope = "server")
	void getShipToExcel() throws Exception {
		MvcResult mvcResult = mvc.perform(post("/toExcel")
				.contentType("application/json")
				.content(mapToJson(new ListResponse<>(listId))))
				.andExpect(status().isOk())
				.andDo(print())
				.andReturn();

		var content = mvcResult.getResponse().getContentAsString();
		var res = mapListFromJson(content, ShipResponse.class);
	}

	@Test
	@WithMockUser
	void getShipToExcelForbidden() throws Exception {
		mvc.perform(post("/toExcel")
				.contentType("application/json")
				.content(mapToJson(new ListResponse<>(listId))))
				.andExpect(status().isForbidden())
				.andDo(print());
	}

	@Test
	@WithMockOAuth2Scope(scope = "server")
	void getShipByOwnOperatorSuccess() throws Exception {
		MvcResult mvcResult = mvc.perform(post("/own/ToExcel")
				.contentType("application/json")
				.content(mapToJson(new ListResponse<>(List.of(retrieveOwnOperator.getName())))))
				.andExpect(status().isOk())
				.andDo(print())
				.andReturn()
				;

		var content = mvcResult.getResponse().getContentAsString();
		var res = mapListFromJson(content, ShipResponse.class);
	}
}
