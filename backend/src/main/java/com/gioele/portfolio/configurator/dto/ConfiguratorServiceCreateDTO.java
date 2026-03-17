package com.gioele.portfolio.configurator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ConfiguratorServiceCreateDTO(
        @NotBlank String category,
        @NotBlank String name,
        String clientLabel,
        String clientDescription,
        String description,
        @NotNull int setupAmount,
        @NotNull int monthlyAmount,
        String visibleFor,
        String exclusiveGroup,
        Long requiresPackageId,
        Long requiresServiceId,
        @NotNull int sortOrder,
        @NotNull boolean enabled
) {}