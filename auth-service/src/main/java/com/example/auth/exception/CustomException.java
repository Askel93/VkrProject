package com.example.auth.exception;

import org.springframework.security.oauth2.common.exceptions.ClientAuthenticationException;

public class CustomException extends ClientAuthenticationException {

	public CustomException(String msg) {
		super(msg);
	}

	@Override
	public String getOAuth2ErrorCode() {
		return "my_custom_exception";
	}
}
