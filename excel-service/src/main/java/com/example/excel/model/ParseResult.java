package com.example.excel.model;

import lombok.Data;

@Data
public class ParseResult<T> {
	private T t;
	private String error;

	public ParseResult (T t, String error) {
		this.t = t;
		this.error = error;
	}
}
