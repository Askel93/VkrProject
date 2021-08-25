package com.example.account.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.testcontainers.containers.PostgreSQLContainer;

@TestConfiguration
public class PostgreSQLContainerConfig {

	private static final PostgreSQLContainer<?> sqlContainer;

	static {
		sqlContainer = new PostgreSQLContainer<>("postgres:13-alpine")
				.withDatabaseName("integration-tests-db")
				.withUsername("sa")
				.withPassword("sa");
		sqlContainer.start();
	}

	public static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
		public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
			TestPropertyValues.of(
					"spring.datasource.url=" + sqlContainer.getJdbcUrl(),
					"spring.datasource.username=" + sqlContainer.getUsername(),
					"spring.datasource.password=" + sqlContainer.getPassword()
			).applyTo(configurableApplicationContext.getEnvironment());
		}
	}
}
