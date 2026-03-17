package com.gioele.portfolio.cms.dto;

import jakarta.validation.constraints.NotNull;

public record SectionOrderDTO(
        @NotNull Long id,
        @NotNull int sortOrder
) {}