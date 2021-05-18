package com.example.ship.controller;

import com.example.ship.response.JmsResponse;
import com.example.ship.service.OwnOperatorService;
import com.example.ship.service.ShipService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JmsConsumer {

	final ShipService shipService;
	final OwnOperatorService ownOperatorService;

	@JmsListener(destination = "jms.topic.ship")
	public void receive(final JmsResponse jmsResponse) {
		log.info("consumed: save ships");
		ownOperatorService.saveAll(jmsResponse.getOwnOperators());
		shipService.saveAll(jmsResponse.getShips());
	}
}
