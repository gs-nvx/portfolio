package com.gioele.portfolio.configurator;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ConfiguratorPackageRepository
        extends JpaRepository<ConfiguratorPackage, Long> {

    List<ConfiguratorPackage> findByEnabledTrueOrderBySortOrderAsc();
    List<ConfiguratorPackage> findAllByOrderBySortOrderAsc();
}