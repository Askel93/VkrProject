package com.example.account.config;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class FormValueValidator implements ConstraintValidator<FormValue, String> {

  private int min;
  private int max;
  private String[] patterns;

  @Override
  public void initialize(FormValue constraint) {
    this.min = constraint.min();
    this.max = constraint.max();
    this.patterns = constraint.patterns();
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    for (String pattern : patterns) {
      if (!value.matches(pattern)) return false;
    }
    return value.length() > min && value.length() < max;
  }
}
