package com.example.auth.response;

import com.example.auth.model.Account;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@Builder
public class AccountResponse {
    private String prevName;
    @NotBlank
    private String userName;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;
    private boolean isAdmin;

    public static AccountResponse toResponse(Account account) {
        return AccountResponse
            .builder()
            .userName(account.getUserName())
            .email(account.getEmail())
            .isAdmin(account.isAdmin())
            .build();
    }

    public Account toAccount() {
        return Account
            .builder()
            .userName(userName)
            .email(email)
            .build();
    }
}
