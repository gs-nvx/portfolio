package com.gioele.portfolio.configurator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ConfiguratorServiceCreateDTO(
        @NotBlank String name,
        @NotBlank String category,
        String serviceType,
        String description,
        @NotNull int setupAmount,
        @NotNull int monthlyAmount,
        Long requiresPackageId,
        Long requiresServiceId,
        @NotNull int sortOrder,
        @NotNull boolean enabled,
        String visibleFor,
        String exclusiveGroup,
        String clientLabel,
        String clientDescription
) {}