package com.example.account.response;

import com.example.account.config.FormValue;
import com.example.account.model.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AccountResponse {
  private String prevName;
  @FormValue(min = 4, max = 16, patterns = "(?!.*[;:])(?=^\\S*$).{4,}", message = "Please provide a valid username")
  private String userName;
  @Email(message = "Please provide a valid email")
  private String email;
  private String firstName;
  private String secondName;
  @FormValue(
    min = 8,
    max = 20,
    patterns = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}",
    message = "Please provide a password (min of 8 characters max of 20)"
  )
  private String password;

  public AccountResponse(String userName, String email, String firstName, String secondName) {
    this(null, userName, email, firstName, secondName, null);
  }

  public AccountResponse(String userName, String email, String password) {
    this(null, userName, email, null, null, password);
  }

  public static AccountResponse toResponse(Account account) {
    return new AccountResponse(account.getName(), account.getEmail(), account.getFirstName(), account.getSecondName());
  }

  public Account toDto() {
    return Account.builder()
      .email(email)
      .name(userName)
      .firstName(firstName)
      .secondName(secondName)
      .build();
  }
}
