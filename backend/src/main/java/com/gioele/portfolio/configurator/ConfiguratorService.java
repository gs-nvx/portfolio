package com.gioele.portfolio.configurator;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "configurator_services")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ConfiguratorService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(name = "service_type",nullable = false, length = 100)
    private String serviceType;

    @Column(length = 500)
    private String description;

    @Column(name = "setup_amount", nullable = false)
    private int setupAmount;

    @Column(name = "monthly_amount", nullable = false)
    private int monthlyAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requires_package_id")
    private ConfiguratorPackage requiresPackage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requires_service_id")
    private ConfiguratorService requiresService;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @Column(nullable = false)
    private boolean enabled;

    @Column(name = "visible_for", length = 500)
    private String visibleFor;

    @Column(name = "exclusive_group", length = 100)
    private String exclusiveGroup;

    @Column(name = "client_label", length = 200)
    private String clientLabel;

    @Column(name = "client_description", length = 500)
    private String clientDescription;
}