package com.gioele.portfolio.blog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

    Page<BlogPost> findByStatusAndLocaleOrderByPublishedAtDesc(
            BlogStatus status, String locale, Pageable pageable);

    Optional<BlogPost> findBySlugAndLocale(String slug, String locale);

    Page<BlogPost> findByLocaleOrderByCreatedAtDesc(String locale, Pageable pageable);

    boolean existsBySlug(String slug);
}