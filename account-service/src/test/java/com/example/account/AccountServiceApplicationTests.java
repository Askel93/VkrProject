package com.example.account;

import com.example.account.config.PostgreSQLContainerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.context.WebApplicationContext;

@EnableConfigurationProperties
@SpringBootTest
@ContextConfiguration(
	initializers = {
		PostgreSQLContainerConfig.Initializer.class
	}
)
@ActiveProfiles("test")
public class AccountServiceApplicationTests extends AllTest  {

	@Autowired
	protected WebApplicationContext context;
}
