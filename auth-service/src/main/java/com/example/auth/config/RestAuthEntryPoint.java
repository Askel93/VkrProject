package com.example.auth.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

@Component
public class RestAuthEntryPoint implements AuthenticationEntryPoint {
	@Override
	public void commence(HttpServletRequest req, HttpServletResponse res, AuthenticationException e) throws IOException {
		Map<String,Object> response = new HashMap<>();
		response.put("status","34");
		response.put("message","unauthorized access");
		res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		OutputStream out = res.getOutputStream();
		ObjectMapper mapper = new ObjectMapper();
		mapper.writerWithDefaultPrettyPrinter().writeValue(out, response);
		out.flush();
	}
}
