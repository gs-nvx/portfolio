package com.gioele.portfolio.cms;

import com.gioele.portfolio.cms.dto.CmsSectionDTO;
import com.gioele.portfolio.cms.dto.CmsSectionUpdateDTO;
import com.gioele.portfolio.cms.dto.SectionOrderDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/cms")
@RequiredArgsConstructor
public class CmsSectionAdminController {

    private final CmsSectionService cmsSectionService;

    @GetMapping("/sections")
    public ResponseEntity<List<CmsSectionDTO>> getAllSections(
            @RequestParam(defaultValue = "it") String locale) {
        return ResponseEntity.ok(cmsSectionService.getAllSections(locale));
    }

    @PutMapping("/sections/{id}")
    public ResponseEntity<CmsSectionDTO> updateSection(
            @PathVariable Long id,
            @Valid @RequestBody CmsSectionUpdateDTO dto) {
        return ResponseEntity.ok(cmsSectionService.updateSection(id, dto));
    }

    @PatchMapping("/sections/{id}/toggle")
    public ResponseEntity<CmsSectionDTO> toggleEnabled(@PathVariable Long id) {
        return ResponseEntity.ok(cmsSectionService.toggleEnabled(id));
    }

    @PutMapping("/sections/order")
    public ResponseEntity<Void> updateOrder(
            @Valid @RequestBody List<SectionOrderDTO> orders) {
        cmsSectionService.updateOrder(orders);
        return ResponseEntity.ok().build();
    }
}