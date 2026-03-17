package com.gioele.portfolio.cms;

import com.gioele.portfolio.cms.dto.CmsSectionDTO;
import com.gioele.portfolio.cms.dto.CmsSectionUpdateDTO;
import com.gioele.portfolio.cms.dto.SectionOrderDTO;
import com.gioele.portfolio.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CmsSectionService {

    private final CmsSectionRepository cmsSectionRepository;

    // --- API pubblica ---

    public List<CmsSectionDTO> getEnabledSections(String locale) {
        return cmsSectionRepository
                .findByEnabledTrueAndLocaleOrderBySortOrderAsc(locale)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // --- API admin ---

    public List<CmsSectionDTO> getAllSections(String locale) {
        return cmsSectionRepository
                .findByLocaleOrderBySortOrderAsc(locale)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public CmsSectionDTO updateSection(Long id, CmsSectionUpdateDTO dto) {
        CmsSection section = cmsSectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sezione non trovata"));

        section.setEnabled(dto.enabled());
        section.setContentJson(dto.contentJson());
        section.setSortOrder(dto.sortOrder());
        section.setUpdatedAt(LocalDateTime.now());

        return toDTO(cmsSectionRepository.save(section));
    }

    public CmsSectionDTO toggleEnabled(Long id) {
        CmsSection section = cmsSectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sezione non trovata"));

        section.setEnabled(!section.isEnabled());
        section.setUpdatedAt(LocalDateTime.now());

        return toDTO(cmsSectionRepository.save(section));
    }

    // --- Mapper ---

    private CmsSectionDTO toDTO(CmsSection section) {
        return new CmsSectionDTO(
                section.getId(),
                section.getSectionKey(),
                section.isEnabled(),
                section.getContentJson(),
                section.getSortOrder(),
                section.getLocale(),
                section.getUpdatedAt()
        );
    }

    public void updateOrder(List<SectionOrderDTO> orders) {
        orders.forEach(o -> {
            CmsSection section = cmsSectionRepository.findById(o.id())
                    .orElseThrow(() -> new ResourceNotFoundException("Sezione non trovata: " + o.id()));
            section.setSortOrder(o.sortOrder());
            section.setUpdatedAt(LocalDateTime.now());
            cmsSectionRepository.save(section);
        });
    }
}