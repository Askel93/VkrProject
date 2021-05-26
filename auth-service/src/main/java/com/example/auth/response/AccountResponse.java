package com.example.auth.response;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class AccountResponse {
    private String prevName;
    @NotBlank
    private String userName;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;
}
