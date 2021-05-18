package com.example.excel.config;

import com.example.excel.response.JmsResponse;
import lombok.RequiredArgsConstructor;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.support.converter.MappingJackson2MessageConverter;
import org.springframework.jms.support.converter.MessageConverter;
import org.springframework.jms.support.converter.MessageType;

import javax.jms.ConnectionFactory;
import java.util.HashMap;
import java.util.Map;

@EnableJms
@Configuration
@RequiredArgsConstructor
public class JmsConfig {

	final JmsProperties jmsProperties;

	@Bean
	@Primary
	public ConnectionFactory connectionFactory() {
		var factory = new ActiveMQConnectionFactory(jmsProperties.getUser(), jmsProperties.getPassword(), jmsProperties.getUrl());
//		factory.setTrustedPackages(singletonList(JmsResponse.class.getPackage().getName()));
		factory.setTrustAllPackages(true);
		return factory;
	}

	@Bean
	public MessageConverter jacksonJmsMessageConverter() {
		MappingJackson2MessageConverter converter = new MappingJackson2MessageConverter();

		Map<String, Class<?>> typeIdMappings = new HashMap<>();
		typeIdMappings.put("JMS_TYPE", JmsResponse.class);

		converter.setTypeIdMappings(typeIdMappings);
		converter.setTargetType(MessageType.TEXT);
		converter.setTypeIdPropertyName("JMS_TYPE");

		return converter;
	}

	@SuppressWarnings("SpellCheckingInspection")
	@Bean
	public JmsListenerContainerFactory<?> myFactory(ConnectionFactory connectionFactory,
																									DefaultJmsListenerContainerFactoryConfigurer configurer) {
		DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
		factory.setMessageConverter(jacksonJmsMessageConverter());
		configurer.configure(factory, connectionFactory);
		return factory;
	}

	@Bean
	public JmsTemplate jmsTemplate(){
		JmsTemplate template = new JmsTemplate();
		template.setMessageConverter(jacksonJmsMessageConverter());
		template.setConnectionFactory(connectionFactory());
		return template;
	}



//	@Bean
//	public DefaultJmsListenerContainerFactory jmsListenerContainerFactory() {
//		var factory = new DefaultJmsListenerContainerFactory();
//		factory.setConnectionFactory(connectionFactory());
//		factory.setClientId(ExcelServiceApplication.class.getName());
//		factory.setConcurrency("2-10");
//		return factory;
//	}


}
