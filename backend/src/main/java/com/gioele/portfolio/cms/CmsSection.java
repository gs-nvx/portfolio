package com.gioele.portfolio.cms;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cms_sections")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CmsSection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "section_key", nullable = false, length = 50)
    private String sectionKey;

    @Column(nullable = false)
    private boolean enabled;

    @Column(name = "content_json", nullable = false, columnDefinition = "TEXT")
    private String contentJson;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @Column(nullable = false, length = 5)
    private String locale;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}