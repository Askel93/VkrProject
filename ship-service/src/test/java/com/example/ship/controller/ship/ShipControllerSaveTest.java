package com.example.ship.controller.ship;

import com.example.ship.controller.ShipInitController;
import com.example.ship.model.Ship;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ShipControllerSaveTest extends ShipInitController {

	@Test
	@WithMockUser(roles = "USER")
	void saveShipSuccess() throws Exception {
		MvcResult mvcResult = mvc.perform(post("/ship/")
				.contentType(MediaType.APPLICATION_JSON)
				.content(mapToJson(response.toResponse(savedShip))))
				.andDo(print())
				.andReturn();
		System.out.println(savedShip);
		int status = mvcResult.getResponse().getStatus();
		assertEquals(201, status);

		String content = mvcResult.getResponse().getContentAsString();
		Ship savedShip = mapFromJson(content, Ship.class);
		assertEquals(savedShip.getName(), savedShip.getName());
	}

	@Test
	void saveShipFailureUnauthorized() throws Exception {

		mvc.perform(post("/ship/")
				.contentType(MediaType.APPLICATION_JSON)
				.content(mapToJson(response.toResponse(savedShip))))
				.andDo(print())
				.andExpect(status().isUnauthorized())
		;
	}

	@Test
	@WithMockUser
	void saveShipFailureExists() throws Exception {
		mvc.perform(post("/ship/")
				.contentType(MediaType.APPLICATION_JSON)
				.content(mapToJson(response.toResponse(retrieveShip))))
				.andDo(print())
				.andExpect(status().isConflict());
	}
}
