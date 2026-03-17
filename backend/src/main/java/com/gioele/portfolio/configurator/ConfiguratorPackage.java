package com.gioele.portfolio.configurator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "configurator_packages")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ConfiguratorPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(name = "setup_amount", nullable = false)
    private int setupAmount;

    @Column(name = "monthly_amount", nullable = false)
    private int monthlyAmount;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @Column(nullable = false)
    private boolean enabled;

    @Column(name = "offer_label", length = 100)
    private String offerLabel;

    @Column(name = "offer_discount_setup")
    private Integer offerDiscountSetup;

    @Column(name = "offer_discount_monthly")
    private Integer offerDiscountMonthly;

    @Column(name = "offer_enabled", nullable = false)
    private boolean offerEnabled;

    @Column(name = "activity_type", length = 100)
    private String activityType;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "configurator_package_services",
            joinColumns = @JoinColumn(name = "package_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    @Builder.Default
    private Set<ConfiguratorService> includedServices = new HashSet<>();
}