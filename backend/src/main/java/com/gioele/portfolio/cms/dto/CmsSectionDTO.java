package com.gioele.portfolio.cms.dto;

import java.time.LocalDateTime;

public record CmsSectionDTO(
        Long id,
        String sectionKey,
        boolean enabled,
        String contentJson,
        int sortOrder,
        String locale,
        LocalDateTime updatedAt
) {}