package com.example.ship.controller.ship;

import com.example.ship.controller.ShipInitController;
import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.model.Ship;
import com.example.ship.response.ListResponse;
import com.example.ship.response.ShipResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import java.util.stream.Collectors;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ShipControllerEditTest extends ShipInitController {

	@Test
	@WithMockUser(roles = "ADMIN")
	void deleteShipSuccess() throws Exception {
		mvc.perform(delete("/ship/id")
				.param("id", deletedShip.getId().toString()))
				.andDo(print())
				.andExpect(status().isOk());
		assertThrows(ResourceNotFoundException.class, () -> service.findById(deletedShip.getId()));

		isInit = false;
	}

	@Test
	@WithMockUser
	void deleteShipForbidden() throws Exception {
		mvc.perform(delete("/ship/id")
				.param("id", "2"))
				.andDo(print())
				.andExpect(status().isForbidden());
	}

	@Test
	@WithMockUser(roles = "ADMIN")
	void deleteAllShipByIdSuccess() throws Exception {
		var listId = ships.stream().map(Ship::getId).collect(Collectors.toList());
		mvc.perform(delete("/ship/all")
				.contentType("application/json")
				.content(mapToJson(new ListResponse<>(listId))))
				.andDo(print())
				.andExpect(status().isOk())
				;

		isInit = false;
	}

	@Test
	@WithMockUser
	void updateSuccess() throws Exception {
		MvcResult mvcResult = mvc.perform(put("/ship/")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(mapToJson(response.toResponse(updatedShip))))
				.andDo(print())
				.andExpect(status().isOk())
				.andReturn();
		var content = mvcResult.getResponse().getContentAsString();
		var res = mapFromJson(content, ShipResponse.class);
		isInit = false;
	}

	@Test
	@WithMockUser
	void updateShipFailureNotExists() throws Exception {
		var updatedShip = new Ship(100, "", 2020);
		mvc.perform(put("/ship/")
				.content(mapToJson(response.toResponse(updatedShip)))
				.contentType(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(status().isNotFound());
	}

	@Test
	void updateShipFailureUnauthorized() throws Exception {
		mvc.perform(put("/ship/")
				.content(mapToJson(response.toResponse(updatedShip)))
				.contentType(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(status().isUnauthorized());
	}
}
