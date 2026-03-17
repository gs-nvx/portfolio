package com.gioele.portfolio.cms;

import com.gioele.portfolio.cms.dto.CmsSectionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cms")
@RequiredArgsConstructor
public class CmsSectionPublicController {

    private final CmsSectionService cmsSectionService;

    @GetMapping("/sections")
    public ResponseEntity<List<CmsSectionDTO>> getEnabledSections(
            @RequestParam(defaultValue = "it") String locale) {
        return ResponseEntity.ok(cmsSectionService.getEnabledSections(locale));
    }
}