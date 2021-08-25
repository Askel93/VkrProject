package com.example.ship.controller.ship;

import com.example.ship.controller.ShipInitController;
import com.example.ship.response.ShipResponse;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ShipControllerFindTest extends ShipInitController {

	@SuppressWarnings("ConstantConditions")
	@Test
	void findShipSuccess() throws Exception {
		MvcResult mvcResult = mvc.perform(get("/ship/id")
				.param("id", retrieveShip.getId().toString()))
				.andDo(print())
				.andExpect(status().isOk())
				.andReturn();

		String content = mvcResult.getResponse().getContentAsString();
		var findShip = mapFromJson(content, ShipResponse.class);

		assertEquals(findShip.getId(), retrieveShip.getId());

		assertEquals(findShip.getOwnName(), retrieveShip.getOwnName());

		assertNotNull(cacheManager.getCache("ships").get(retrieveShip.getId()));

		assertEquals(findShip.getShipEngine().getEngines().size(), 1);
		assertEquals(findShip.getShipEngine().getSumPwr(), 1000);
	}

	@Test
	void findShipNotFound() throws Exception {
		var notFoundShipId = 100;
		MvcResult res =  mvc.perform(get("/ship/id").param("id", "" + notFoundShipId))
				.andDo(print())
				.andExpect(status().isNotFound())
				.andReturn();
		String errMessage = res.getResponse().getErrorMessage();
		assertEquals(errMessage, "Resource not found with id " + notFoundShipId);
	}

	@Test
	void getCountPage() throws Exception {
		MvcResult mvcResult = mvc.perform(get("/ship/count").param("size", "2"))
				.andDo(print())
				.andExpect(status().isOk())
				.andReturn();
		var content = mvcResult.getResponse().getContentAsString();
		assertEquals(content, "" + count);
	}

	@Test
	void getShipPage() throws Exception{
		MvcResult mvcResult = mvc.perform(get("/ship").param("size", "2"))
				.andDo(print())
				.andExpect(status().isOk())
				.andReturn();
		var content = mvcResult.getResponse().getContentAsString();

		var res = mapListFromJson(content, ShipResponse.class);
		assertEquals(res.size(), 2);
		assertEquals(res.get(0).getId(), ships.get(0).getId());
	}
}
