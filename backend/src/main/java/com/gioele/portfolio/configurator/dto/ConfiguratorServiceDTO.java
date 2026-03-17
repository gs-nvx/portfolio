package com.gioele.portfolio.configurator.dto;

public record ConfiguratorServiceDTO(
        Long id,
        String category,
        String name,
        String clientLabel,
        String clientDescription,
        String description,
        int setupAmount,
        int monthlyAmount,
        String visibleFor,
        String exclusiveGroup,
        Long requiresPackageId,
        Long requiresServiceId,
        int sortOrder,
        boolean enabled
) {}