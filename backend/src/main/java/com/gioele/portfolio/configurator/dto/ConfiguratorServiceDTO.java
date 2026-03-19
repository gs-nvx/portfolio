package com.gioele.portfolio.configurator.dto;

public record ConfiguratorServiceDTO(
        Long id,
        String name,
        String category,
        String serviceType,
        String description,
        int setupAmount,
        int monthlyAmount,
        Long requiresPackageId,
        Long requiresServiceId,
        int sortOrder,
        boolean enabled,
        String visibleFor,
        String exclusiveGroup,
        String clientLabel,
        String clientDescription
) {}