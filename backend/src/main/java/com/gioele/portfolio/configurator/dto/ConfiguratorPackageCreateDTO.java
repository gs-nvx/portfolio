package com.gioele.portfolio.configurator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record ConfiguratorPackageCreateDTO(
        @NotBlank String name,
        String description,
        String activityType,
        @NotNull int setupAmount,
        @NotNull int monthlyAmount,
        @NotNull int sortOrder,
        @NotNull boolean enabled,
        String offerLabel,
        Integer offerDiscountSetup,
        Integer offerDiscountMonthly,
        @NotNull boolean offerEnabled,
        List<Long> includedServiceIds
) {}