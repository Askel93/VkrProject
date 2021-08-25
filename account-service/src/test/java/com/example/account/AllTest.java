package com.example.account;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;

import java.io.IOException;
import java.util.List;

public class AllTest extends Assert {

  private ObjectMapper objectMapper = new ObjectMapper();

  protected String mapToJson(Object obj) throws JsonProcessingException {
    objectMapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
    return objectMapper.writeValueAsString(obj);
  }

  protected <T> T mapFromJson(String json, Class<T> clazz) throws IOException {
    return objectMapper
      .readValue(json, clazz);
  }

  protected <T> List<T> mapListFromJson(String json, Class<T> clazz) throws IOException {
    var listType = objectMapper.getTypeFactory().constructCollectionType(List.class, clazz);
    return objectMapper.convertValue(mapFromJson(json, Object.class), listType);
  }
}
