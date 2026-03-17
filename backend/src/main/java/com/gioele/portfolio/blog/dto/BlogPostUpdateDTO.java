package com.gioele.portfolio.blog.dto;

import com.gioele.portfolio.blog.BlogStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BlogPostUpdateDTO(
        @NotBlank String title,
        @NotBlank String body,
        String category,
        String seoTitle,
        String seoDescription,
        String seoOgImage,
        @NotNull BlogStatus status
) {}