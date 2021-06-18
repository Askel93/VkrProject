package com.example.ship;

import com.example.ship.repository.impl.BaseRepositoryImpl;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.task.TaskExecutionAutoConfiguration;
import org.springframework.boot.autoconfigure.task.TaskSchedulingAutoConfiguration;
import org.springframework.boot.autoconfigure.websocket.servlet.WebSocketServletAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;

@SpringBootApplication(exclude = {
		TaskExecutionAutoConfiguration.class,
		TaskSchedulingAutoConfiguration.class,
		WebSocketServletAutoConfiguration.class
})
@EnableDiscoveryClient
@EnableOAuth2Client
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableJpaRepositories(
		basePackages = "com.example.ship.repository.impl",
		repositoryBaseClass = BaseRepositoryImpl.class
)
@EnableCaching
public class ShipServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShipServiceApplication.class, args);
	}

	@Bean
	public MappingJackson2HttpMessageConverter objectMapper() {
		MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		mapper.configure(MapperFeature.DEFAULT_VIEW_INCLUSION, true);
		mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
		jsonConverter.setObjectMapper(mapper);
		return jsonConverter;
	}
}
