package com.example.ship.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "mq")
public class JmsProperties {

	String user;
	String password;

	@Data
	public static class Server {
		Integer port;
		String host;
	}

	String url;
}