package com.example.excel.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OwnOperator {

	private String name;
	private String address;
	@JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
	private String[] phones;
	private String email;
	@JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
	private String[] fax;

	public OwnOperator(String name, String address, String[] phones,
										 String email, String[] fax) {
		this.name = name;
		this.address = address;
		this.phones = phones;
		this.email = email;
		this.fax = fax;
	}

	@JsonIgnore
	public String getPhonesAsString() {
		return getArrayAsString(phones);
	}
	@JsonIgnore
	public String getFaxAsString() {
		return getArrayAsString(fax);
	}
	private String getArrayAsString(String[] arr) {
		StringBuilder res = new StringBuilder();
		String prefix = "";
		for (String item : arr) {
			res.append(prefix);
			prefix = ", ";
			res.append(item);
		}
		return res.toString();
	}
}
