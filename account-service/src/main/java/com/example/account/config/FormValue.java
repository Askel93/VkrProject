package com.example.account.config;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@SuppressWarnings("unused")
@Constraint(validatedBy = FormValueValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface FormValue {
  String message() default "";
  int min() default 0;
  int max() default 25;
  String[] patterns() default {};
  Class<?> targetValue() default String.class;
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}
