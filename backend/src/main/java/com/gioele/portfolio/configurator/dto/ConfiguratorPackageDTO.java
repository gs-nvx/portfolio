package com.gioele.portfolio.configurator.dto;

import java.util.List;

public record ConfiguratorPackageDTO(
        Long id,
        String name,
        String description,
        int setupAmount,
        int monthlyAmount,
        int sortOrder,
        boolean enabled,
        String offerLabel,
        Integer offerDiscountSetup,
        Integer offerDiscountMonthly,
        boolean offerEnabled,
        List<Long> includedServiceIds
) {}