package com.example.ship.controller.ownoperator;

import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.response.OwnOperatorResponse;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class OwnOperatorControllerFindTest extends OwnOperatorInitController {

	@Test
	void findByIdSuccess() throws Exception {
		MvcResult mvcResult = mvc.perform(
				get("/ownoperator/id")
						.param("id", retrieveOwnOperator.getName()))
				.andDo(print())
				.andExpect(status().isOk())
				.andReturn();
		var content = mvcResult.getResponse().getContentAsString();
		var findOwnOperator = mapFromJson(content, OwnOperatorResponse.class);
//		assertEquals(findOwnOperator.getShipsOwn().size(), ships.size());
//		assertEquals(findOwnOperator.getShipsOperator().size(), ships.size());
	}

	@Test
	void findByIdNotFound() throws Exception {
		MvcResult mvcResult = mvc.perform(get("/ownoperator/id").param("id", "example"))
				.andExpect(status().isNotFound())
				.andReturn();
		Optional<?> ex = Optional.ofNullable(mvcResult.getResolvedException());
		ex.ifPresent((e) -> Assert.assertTrue(e instanceof ResourceNotFoundException));
	}

	@Test
	void getCountPage() throws Exception {
		MvcResult mvcResult = mvc.perform(get("/ownoperator/count")
				.param("size", "2"))
				.andDo(print())
				.andExpect(status().isOk())
				.andReturn();

		var content = mvcResult.getResponse().getContentAsString();
		assertEquals(content, "" + count);
	}

	@Test
	void getPageTest() throws Exception {
		MvcResult mvcResult = mvc.perform(get("/ownoperator")
				.param("size", "2"))
				.andDo(print())
				.andExpect(status().isOk())
				.andReturn();

		var content = mvcResult.getResponse().getContentAsString();
		var res = mapListFromJson(content, OwnOperatorResponse.class);
		assertEquals(res.size(), 2);
	}
}