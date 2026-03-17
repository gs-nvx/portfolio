package com.gioele.portfolio.configurator.dto;

public record ConfiguratorServiceDTO(
        Long id,
        String category,
        String name,
        String description,
        int setupAmount,
        int monthlyAmount,
        Long requiresPackageId,
        Long requiresServiceId,
        int sortOrder,
        boolean enabled
) {}