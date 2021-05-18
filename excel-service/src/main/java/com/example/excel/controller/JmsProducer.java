package com.example.excel.controller;

import com.example.excel.response.JmsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JmsProducer {

	final JmsTemplate jmsTemplate;


	public void send(final JmsResponse message) {
		log.info("producing");
		jmsTemplate.convertAndSend("jms.topic.ship", message);
	}
}
