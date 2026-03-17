package com.gioele.portfolio.cms;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CmsSectionRepository extends JpaRepository<CmsSection, Long> {

    List<CmsSection> findByLocaleOrderBySortOrderAsc(String locale);

    List<CmsSection> findByEnabledTrueAndLocaleOrderBySortOrderAsc(String locale);

    Optional<CmsSection> findBySectionKeyAndLocale(String sectionKey, String locale);
}