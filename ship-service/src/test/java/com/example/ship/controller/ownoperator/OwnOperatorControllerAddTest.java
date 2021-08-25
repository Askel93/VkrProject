package com.example.ship.controller.ownoperator;

import com.example.ship.model.OwnOperator;
import com.example.ship.response.OwnOperatorResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class OwnOperatorControllerAddTest extends OwnOperatorInitController {


	@Test
	@WithMockUser
	void saveOwnOperatorSuccess() throws Exception {
		System.out.println(response.toResponse(savedOwnOperator));
		mvc.perform(post("/ownoperator/")
				.contentType(MediaType.APPLICATION_JSON)
				.content(mapToJson(response.toResponse(savedOwnOperator))))
				.andDo(print())
				.andExpect(status().isCreated())
		;
	}

	@Test
	void saveOwnOperatorFailureUnauthorized() throws Exception {
		mvc.perform(post("/ownoperator/")
				.contentType(MediaType.APPLICATION_JSON)
				.content(mapToJson(response.toResponse(savedOwnOperator))))
				.andDo(print())
				.andExpect(status().isUnauthorized())
		;
	}


	@Test
	@WithMockUser
	void updateOwnOperatorSuccess() throws Exception {
		MvcResult mvcResult = mvc.perform(put("/ownoperator/")
				.content(mapToJson(response.toListResponse(updatedOwnOperator)))
				.contentType(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(status().isOk())
				.andReturn();

		var content = mvcResult.getResponse().getContentAsString();
		var res = mapFromJson(content, OwnOperatorResponse.class);
		assertEquals(res.getAddress(), "example address");
	}

	@Test
	@WithMockUser
	void updateOwnOperatorFailureNotExists() throws Exception {
		var updatedOwnOperator = new OwnOperator("example");
		mvc.perform(put("/ownoperator/")
				.content(mapToJson(response.toListResponse(updatedOwnOperator)))
				.contentType(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(status().isNotFound());
	}
}
