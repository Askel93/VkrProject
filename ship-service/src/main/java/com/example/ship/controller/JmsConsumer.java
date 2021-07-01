package com.example.ship.controller;

import com.example.ship.model.OwnOperator;
import com.example.ship.model.Ship;
import com.example.ship.response.JmsResponse;
import com.example.ship.service.JmsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JmsConsumer {

	final JmsService<Ship> shipService;
	final JmsService<OwnOperator> ownOperatorService;

	@JmsListener(destination = "jms.topic.ship")
	public void receive(final JmsResponse jmsResponse) {
		log.info("consumed: save ships");
		ownOperatorService.saveAll(jmsResponse.getOwnOperators());
		shipService.saveAll(jmsResponse.getShips());
	}
}
