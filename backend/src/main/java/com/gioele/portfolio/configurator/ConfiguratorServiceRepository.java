package com.gioele.portfolio.configurator;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ConfiguratorServiceRepository
        extends JpaRepository<ConfiguratorService, Long> {

    List<ConfiguratorService> findByEnabledTrueOrderByCategoryAscSortOrderAsc();
    List<ConfiguratorService> findAllByOrderByCategoryAscSortOrderAsc();
}