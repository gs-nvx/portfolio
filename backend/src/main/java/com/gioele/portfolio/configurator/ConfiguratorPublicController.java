package com.gioele.portfolio.configurator;

import com.gioele.portfolio.configurator.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/configurator")
@RequiredArgsConstructor
public class ConfiguratorPublicController {

    private final ConfiguratorAppService configuratorAppService;

    @GetMapping("/packages")
    public ResponseEntity<List<ConfiguratorPackageDTO>> getPackages() {
        return ResponseEntity.ok(configuratorAppService.getEnabledPackages());
    }

    @GetMapping("/services")
    public ResponseEntity<List<ConfiguratorServiceDTO>> getServices() {
        return ResponseEntity.ok(configuratorAppService.getEnabledServices());
    }
}