package com.example.account.response;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class AccountResponse {
    @NotBlank
    @Size(min = 4, max = 16)
    String userName;
    @Email
    String email;
    @NotBlank
    String password;
}
