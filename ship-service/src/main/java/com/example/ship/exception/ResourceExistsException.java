package com.example.ship.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ResourceExistsException extends ResponseStatusException {

	public ResourceExistsException(String message) {
		super(HttpStatus.CONFLICT, message);
	}
}
