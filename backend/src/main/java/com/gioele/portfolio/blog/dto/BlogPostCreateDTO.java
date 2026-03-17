package com.gioele.portfolio.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BlogPostCreateDTO(
        @NotBlank String title,
        String slug,           // opzionale — generato dal titolo se assente
        @NotBlank String body,
        String category,
        String seoTitle,
        String seoDescription,
        String seoOgImage,
        @NotBlank String locale
) {}