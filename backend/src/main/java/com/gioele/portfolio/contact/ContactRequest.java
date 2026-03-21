package com.gioele.portfolio.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ContactRequest(
        @NotBlank String nome,
        @Email @NotBlank String email,
        @NotBlank String messaggio,
        String captchaToken,
        String website
) {}