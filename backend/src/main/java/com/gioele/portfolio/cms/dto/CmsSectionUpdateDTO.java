package com.gioele.portfolio.cms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CmsSectionUpdateDTO(
        @NotNull boolean enabled,
        @NotBlank String contentJson,
        @NotNull int sortOrder
) {}