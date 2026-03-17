package com.gioele.portfolio.blog;

import com.gioele.portfolio.blog.dto.*;
import com.gioele.portfolio.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.text.Normalizer;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;

    // --- API pubblica ---

    public Page<BlogPostSummaryDTO> getPublishedPosts(String locale, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return blogPostRepository
                .findByStatusAndLocaleOrderByPublishedAtDesc(BlogStatus.PUBLISHED, locale, pageable)
                .map(this::toSummaryDTO);
    }

    public BlogPostDetailDTO getPublishedPostBySlug(String slug, String locale) {
        return blogPostRepository.findBySlugAndLocale(slug, locale)
                .filter(p -> p.getStatus() == BlogStatus.PUBLISHED)
                .map(this::toDetailDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Articolo non trovato"));
    }

    // --- API admin ---

    public Page<BlogPostSummaryDTO> getAllPosts(String locale, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return blogPostRepository
                .findByLocaleOrderByCreatedAtDesc(locale, pageable)
                .map(this::toSummaryDTO);
    }

    public BlogPostDetailDTO getPostById(Long id) {
        return blogPostRepository.findById(id)
                .map(this::toDetailDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Articolo non trovato"));
    }

    public BlogPostDetailDTO createPost(BlogPostCreateDTO dto) {
        String slug = resolveSlug(dto.slug(), dto.title());

        BlogPost post = BlogPost.builder()
                .title(dto.title())
                .slug(slug)
                .body(dto.body())
                .category(dto.category())
                .seoTitle(dto.seoTitle())
                .seoDescription(dto.seoDescription())
                .seoOgImage(dto.seoOgImage())
                .status(BlogStatus.DRAFT)
                .locale(dto.locale())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return toDetailDTO(blogPostRepository.save(post));
    }

    public BlogPostDetailDTO updatePost(Long id, BlogPostUpdateDTO dto) {
        BlogPost post = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Articolo non trovato"));

        post.setTitle(dto.title());
        post.setBody(dto.body());
        post.setCategory(dto.category());
        post.setSeoTitle(dto.seoTitle());
        post.setSeoDescription(dto.seoDescription());
        post.setSeoOgImage(dto.seoOgImage());
        post.setUpdatedAt(LocalDateTime.now());

        // gestione pubblicazione
        if (dto.status() == BlogStatus.PUBLISHED && post.getStatus() == BlogStatus.DRAFT) {
            post.setStatus(BlogStatus.PUBLISHED);
            post.setPublishedAt(LocalDateTime.now());
        } else if (dto.status() == BlogStatus.DRAFT) {
            post.setStatus(BlogStatus.DRAFT);
        }

        return toDetailDTO(blogPostRepository.save(post));
    }

    public void deletePost(Long id) {
        if (!blogPostRepository.existsById(id)) {
            throw new ResourceNotFoundException("Articolo non trovato");
        }
        blogPostRepository.deleteById(id);
    }

    // --- Utility ---

    private String resolveSlug(String slugInput, String title) {
        String base = (slugInput != null && !slugInput.isBlank()) ? slugInput : generateSlug(title);
        String slug = base;
        int counter = 1;
        while (blogPostRepository.existsBySlug(slug)) {
            slug = base + "-" + counter++;
        }
        return slug;
    }

    private String generateSlug(String title) {
        return Normalizer.normalize(title, Normalizer.Form.NFD)
                .replaceAll("[\\p{InCombiningDiacriticalMarks}]", "")
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9\\s-]", "")
                .trim()
                .replaceAll("\\s+", "-");
    }

    // --- Mapper ---

    private BlogPostSummaryDTO toSummaryDTO(BlogPost post) {
        return new BlogPostSummaryDTO(
                post.getId(),
                post.getTitle(),
                post.getSlug(),
                post.getCategory(),
                post.getSeoDescription(),
                post.getSeoOgImage(),
                post.getStatus(),
                post.getLocale(),
                post.getPublishedAt()
        );
    }

    private BlogPostDetailDTO toDetailDTO(BlogPost post) {
        return new BlogPostDetailDTO(
                post.getId(),
                post.getTitle(),
                post.getSlug(),
                post.getBody(),
                post.getCategory(),
                post.getSeoTitle(),
                post.getSeoDescription(),
                post.getSeoOgImage(),
                post.getStatus(),
                post.getLocale(),
                post.getPublishedAt(),
                post.getUpdatedAt()
        );
    }
}