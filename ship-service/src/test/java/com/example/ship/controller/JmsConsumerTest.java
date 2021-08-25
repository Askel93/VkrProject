package com.example.ship.controller;

import com.example.ship.ShipServiceApplicationTests;
import com.example.ship.config.ShipTestProperties;
import com.example.ship.model.OwnOperator;
import com.example.ship.model.Ship;
import com.example.ship.response.JmsResponse;
import com.example.ship.service.OwnOperatorService;
import com.example.ship.service.ShipService;
import org.apache.activemq.junit.EmbeddedActiveMQBroker;
import org.junit.Rule;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.jms.ConnectionFactory;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class JmsConsumerTest extends ShipServiceApplicationTests {

	@Rule
	public static EmbeddedActiveMQBroker broker = new EmbeddedActiveMQBroker();

	private static final ShipTestProperties prop = new ShipTestProperties();
	private static final List<Ship> ships = prop.ships;
	private static final List<OwnOperator> ownOperators = prop.ownOperators;

	@Configuration
	static class JmsTestConfig {
		@Bean
		public ConnectionFactory connectionFactory() {
			return broker.createConnectionFactory();
		}
	}

	@Autowired
	private JmsTemplate template;

	@Autowired
	private ShipService shipService;

	@Autowired
	private OwnOperatorService ownOperatorService;

	@Test
	void jmsListenerTest() {
		var jmsResponse = new JmsResponse();
		jmsResponse.setShips(ships);
		jmsResponse.setOwnOperators(ownOperators);
		template.convertAndSend("jms.topic.ship", jmsResponse);
		template.setReceiveTimeout(10000);
		System.out.println(shipService.findPage(0, 10, "id", null));
	}
}
