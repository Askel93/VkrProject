package com.example.ship;

import com.example.ship.config.View;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.testcontainers.containers.PostgreSQLContainer;

import java.io.IOException;
import java.util.List;

@ContextConfiguration(
	initializers = {ShipServiceApplicationTests.Initializer.class}
)
public class ShipServiceApplicationTests extends Assert {

	private static PostgreSQLContainer<?> sqlContainer;

	@Autowired
	private ObjectMapper objectMapper;

	static {
		sqlContainer = new PostgreSQLContainer<>("postgres:13-alpine")
			.withDatabaseName("integration-tests-db")
			.withUsername("sa")
			.withPassword("sa");
		sqlContainer.start();
	}

	static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
		public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
			TestPropertyValues.of(
				"spring.datasource.url=" + sqlContainer.getJdbcUrl(),
				"spring.datasource.username=" + sqlContainer.getUsername(),
				"spring.datasource.password=" + sqlContainer.getPassword()
			).applyTo(configurableApplicationContext.getEnvironment());
		}
	}

	protected String mapToJson(Object obj) throws JsonProcessingException {
		return objectMapper
			.writerWithView(View.UI.class)
			.writeValueAsString(obj);
	}

	protected <T> T mapFromJson(String json, Class<T> clazz)
		throws IOException {
		return objectMapper
			.readerWithView(View.UI.class)
			.readValue(json, clazz);
	}

	protected <T> List<T> mapListFromJson(String json, Class<T> clazz) throws IOException {
		var listType = objectMapper.getTypeFactory().constructCollectionType(List.class, clazz);
		return objectMapper.convertValue(mapFromJson(json, Object.class), listType);
	}
}
