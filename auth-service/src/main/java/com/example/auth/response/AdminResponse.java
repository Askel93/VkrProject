package com.example.auth.response;

import com.example.auth.model.Account;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminResponse {
	private String userName;
	private String email;
	private boolean isAdmin;

	public static AdminResponse toResponse(Account account) {
		return AdminResponse
				.builder()
				.email(account.getEmail())
				.userName(account.getUserName())
				.isAdmin(account.isAdmin())
				.build();
	}
}
