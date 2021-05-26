package com.example.account.response;

import com.example.account.model.Account;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Builder
public class AccountResponse {
    String prevName;
    @NotBlank
    @Size(min = 4, max = 16)
    String userName;
    @Email
    String email;
    String firstName;
    String secondName;
    @NotBlank
    String password;

    public static AccountResponse toResponse(Account account) {
        return AccountResponse.builder()
            .userName(account.getName())
            .email(account.getEmail())
            .firstName(account.getFirstName())
            .secondName(account.getSecondName())
            .build();
    }
}
