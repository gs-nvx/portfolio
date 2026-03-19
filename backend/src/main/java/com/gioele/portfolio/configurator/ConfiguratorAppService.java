package com.gioele.portfolio.configurator;

import com.gioele.portfolio.configurator.dto.*;
import com.gioele.portfolio.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ConfiguratorAppService {

    private final ConfiguratorPackageRepository packageRepository;
    private final ConfiguratorServiceRepository serviceRepository;

    // --- Pubblico ---

    @Transactional(readOnly = true)
    public List<ConfiguratorPackageDTO> getEnabledPackages() {
        return packageRepository.findByEnabledTrueOrderBySortOrderAsc()
                .stream().map(this::toPackageDTO).toList();
    }

    public List<ConfiguratorServiceDTO> getEnabledServices() {
        return serviceRepository.findByEnabledTrueOrderByCategoryAscSortOrderAsc()
                .stream().map(this::toServiceDTO).toList();
    }

    // --- Admin pacchetti ---

    @Transactional(readOnly = true)
    public List<ConfiguratorPackageDTO> getAllPackages() {
        return packageRepository.findAllByOrderBySortOrderAsc()
                .stream().map(this::toPackageDTO).toList();
    }

    // createPackage — aggiungi activityType
    @Transactional
    public ConfiguratorPackageDTO createPackage(ConfiguratorPackageCreateDTO dto) {
        ConfiguratorPackage pkg = ConfiguratorPackage.builder()
                .name(dto.name())
                .description(dto.description())
                .activityType(dto.activityType())
                .setupAmount(dto.setupAmount())
                .monthlyAmount(dto.monthlyAmount())
                .sortOrder(dto.sortOrder())
                .enabled(dto.enabled())
                .offerLabel(dto.offerLabel())
                .offerDiscountSetup(dto.offerDiscountSetup())
                .offerDiscountMonthly(dto.offerDiscountMonthly())
                .offerEnabled(dto.offerEnabled())
                .includedServices(resolveServices(dto.includedServiceIds()))
                .build();
        return toPackageDTO(packageRepository.save(pkg));
    }

    // updatePackage — aggiungi activityType
    @Transactional
    public ConfiguratorPackageDTO updatePackage(Long id, ConfiguratorPackageCreateDTO dto) {
        ConfiguratorPackage pkg = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pacchetto non trovato"));
        pkg.setName(dto.name());
        pkg.setDescription(dto.description());
        pkg.setActivityType(dto.activityType());
        pkg.setSetupAmount(dto.setupAmount());
        pkg.setMonthlyAmount(dto.monthlyAmount());
        pkg.setSortOrder(dto.sortOrder());
        pkg.setEnabled(dto.enabled());
        pkg.setOfferLabel(dto.offerLabel());
        pkg.setOfferDiscountSetup(dto.offerDiscountSetup());
        pkg.setOfferDiscountMonthly(dto.offerDiscountMonthly());
        pkg.setOfferEnabled(dto.offerEnabled());
        pkg.setIncludedServices(resolveServices(dto.includedServiceIds()));
        return toPackageDTO(packageRepository.save(pkg));
    }

    @Transactional
    public void deletePackage(Long id) {
        if (!packageRepository.existsById(id))
            throw new ResourceNotFoundException("Pacchetto non trovato");
        packageRepository.deleteById(id);
    }

    // --- Admin servizi ---

    public List<ConfiguratorServiceDTO> getAllServices() {
        return serviceRepository.findAllByOrderByCategoryAscSortOrderAsc()
                .stream().map(this::toServiceDTO).toList();
    }

    @Transactional
    public ConfiguratorServiceDTO createService(ConfiguratorServiceCreateDTO dto) {
        return toServiceDTO(serviceRepository.save(buildService(new ConfiguratorService(), dto)));
    }

    @Transactional
    public ConfiguratorServiceDTO updateService(Long id, ConfiguratorServiceCreateDTO dto) {
        ConfiguratorService service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Servizio non trovato"));
        return toServiceDTO(serviceRepository.save(buildService(service, dto)));
    }

    @Transactional
    public void deleteService(Long id) {
        if (!serviceRepository.existsById(id))
            throw new ResourceNotFoundException("Servizio non trovato");
        serviceRepository.deleteById(id);
    }

    // --- Utility ---

    private Set<ConfiguratorService> resolveServices(List<Long> ids) {
        if (ids == null || ids.isEmpty()) return new HashSet<>();
        return new HashSet<>(serviceRepository.findAllById(ids));
    }

    // buildService — aggiungi i nuovi campi
    private ConfiguratorService buildService(ConfiguratorService s,
                                             ConfiguratorServiceCreateDTO dto) {
        s.setName(dto.name());
        s.setCategory(dto.category());
        s.setServiceType(dto.serviceType());
        s.setDescription(dto.description());
        s.setSetupAmount(dto.setupAmount());
        s.setMonthlyAmount(dto.monthlyAmount());
        s.setRequiresPackage(dto.requiresPackageId() != null
                ? packageRepository.findById(dto.requiresPackageId()).orElse(null)
                : null);
        s.setRequiresService(dto.requiresServiceId() != null
                ? serviceRepository.findById(dto.requiresServiceId()).orElse(null)
                : null);
        s.setSortOrder(dto.sortOrder());
        s.setEnabled(dto.enabled());
        s.setVisibleFor(dto.visibleFor());
        s.setExclusiveGroup(dto.exclusiveGroup());
        s.setClientLabel(dto.clientLabel());
        s.setClientDescription(dto.clientDescription());
        return s;
    }

    // toPackageDTO
    private ConfiguratorPackageDTO toPackageDTO(ConfiguratorPackage p) {
        return new ConfiguratorPackageDTO(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getSetupAmount(),
                p.getMonthlyAmount(),
                p.getSortOrder(),
                p.isEnabled(),
                p.getOfferLabel(),
                p.getOfferDiscountSetup(),
                p.getOfferDiscountMonthly(),
                p.isOfferEnabled(),
                p.getActivityType(),
                p.getIncludedServices().stream()
                        .map(ConfiguratorService::getId)
                        .toList()
        );
    }

    // toServiceDTO
    private ConfiguratorServiceDTO toServiceDTO(ConfiguratorService s) {
        return new ConfiguratorServiceDTO(
                s.getId(),
                s.getName(),
                s.getCategory(),
                s.getServiceType(),
                s.getDescription(),
                s.getSetupAmount(),
                s.getMonthlyAmount(),
                s.getRequiresPackage() != null ? s.getRequiresPackage().getId() : null,
                s.getRequiresService() != null ? s.getRequiresService().getId() : null,
                s.getSortOrder(),
                s.isEnabled(),
                s.getVisibleFor(),
                s.getExclusiveGroup(),
                s.getClientLabel(),
                s.getClientDescription()
        );
    }
}