package com.gioele.portfolio.contact;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class HCaptchaService {

    @Value("${hcaptcha.secret}")
    private String secret;

    private static final String VERIFY_URL = "https://hcaptcha.com/siteverify";
    private final RestTemplate restTemplate = new RestTemplate();

    public boolean verify(String token) {
        if (token == null || token.isBlank()) return false;
        try {
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("secret", secret);
            params.add("response", token);
            Map<?, ?> response = restTemplate.postForObject(VERIFY_URL, params, Map.class);
            return response != null && Boolean.TRUE.equals(response.get("success"));
        } catch (Exception e) {
            return false;
        }
    }
}