package com.example.ship.controller.ownoperator;

import com.example.ship.model.OwnOperator;
import com.example.ship.response.ListResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.stream.Collectors;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class OwnOperatorControllerEditTest extends OwnOperatorInitController {

	@Test
	@WithMockUser(roles = "ADMIN")
	void deleteOwnOperatorSuccess() throws Exception {
		mvc.perform(delete("/ownoperator/id")
				.param("id", deletedOwnOperator.getName()))
				.andDo(print())
				.andExpect(status().isOk());
	}

	@Test
	@WithMockUser(roles = "ADMIN")
	void deleteOwnOperatorFailureNotExists() throws Exception {
		mvc.perform(delete("/ownoperator/id")
				.param("id", "example"))
				.andDo(print())
				.andExpect(status().isNotFound())
				.andExpect(result ->
						assertEquals(
								result.getResponse().getErrorMessage(),
								"OwnOperator with id example not exists"))
		;
	}

	@Test
	@WithMockUser
	void deleteOwnOperatorForbidden() throws Exception {
		mvc.perform(delete("/ownoperator/id")
				.param("id", deletedOwnOperator.getName()))
				.andDo(print())
				.andExpect(status().isForbidden());
	}

	@Test
	@WithMockUser(roles = "ADMIN")
	void deleteAllOwnOperatorById() throws Exception {
		var listId= ownOperators.stream().map(OwnOperator::getName).collect(Collectors.toList());
		mvc.perform(delete("/ownoperator/all")
				.contentType(MediaType.APPLICATION_JSON)
				.content(mapToJson(new ListResponse<>(listId))))
				.andDo(print())
				.andExpect(status().isOk());
		isInit = false;
	}
}
