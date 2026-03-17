package com.gioele.portfolio.blog.dto;

import com.gioele.portfolio.blog.BlogStatus;
import java.time.LocalDateTime;

public record BlogPostSummaryDTO(
        Long id,
        String title,
        String slug,
        String category,
        String seoDescription,
        String seoOgImage,
        BlogStatus status,
        String locale,
        LocalDateTime publishedAt
) {}