package com.gioele.portfolio.configurator;

import com.gioele.portfolio.configurator.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/admin/configurator")
@RequiredArgsConstructor
public class ConfiguratorAdminController {

    private final ConfiguratorAppService configuratorAppService;

    // Pacchetti
    @GetMapping("/packages")
    public ResponseEntity<List<ConfiguratorPackageDTO>> getAllPackages() {
        return ResponseEntity.ok(configuratorAppService.getAllPackages());
    }

    @PostMapping("/packages")
    public ResponseEntity<ConfiguratorPackageDTO> createPackage(
            @Valid @RequestBody ConfiguratorPackageCreateDTO dto) {
        ConfiguratorPackageDTO created = configuratorAppService.createPackage(dto);
        return ResponseEntity.created(
                URI.create("/api/admin/configurator/packages/" + created.id())
        ).body(created);
    }

    @PutMapping("/packages/{id}")
    public ResponseEntity<ConfiguratorPackageDTO> updatePackage(
            @PathVariable Long id,
            @Valid @RequestBody ConfiguratorPackageCreateDTO dto) {
        return ResponseEntity.ok(configuratorAppService.updatePackage(id, dto));
    }

    @DeleteMapping("/packages/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        configuratorAppService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }

    // Servizi
    @GetMapping("/services")
    public ResponseEntity<List<ConfiguratorServiceDTO>> getAllServices() {
        return ResponseEntity.ok(configuratorAppService.getAllServices());
    }

    @PostMapping("/services")
    public ResponseEntity<ConfiguratorServiceDTO> createService(
            @Valid @RequestBody ConfiguratorServiceCreateDTO dto) {
        ConfiguratorServiceDTO created = configuratorAppService.createService(dto);
        return ResponseEntity.created(
                URI.create("/api/admin/configurator/services/" + created.id())
        ).body(created);
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<ConfiguratorServiceDTO> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ConfiguratorServiceCreateDTO dto) {
        return ResponseEntity.ok(configuratorAppService.updateService(id, dto));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        configuratorAppService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}