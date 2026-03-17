package com.gioele.portfolio.blog;

import com.gioele.portfolio.blog.dto.BlogPostDetailDTO;
import com.gioele.portfolio.blog.dto.BlogPostSummaryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogPostPublicController {

    private final BlogPostService blogPostService;

    @GetMapping
    public ResponseEntity<Page<BlogPostSummaryDTO>> getPublishedPosts(
            @RequestParam(defaultValue = "it") String locale,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(blogPostService.getPublishedPosts(locale, page, size));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<BlogPostDetailDTO> getPostBySlug(
            @PathVariable String slug,
            @RequestParam(defaultValue = "it") String locale) {
        return ResponseEntity.ok(blogPostService.getPublishedPostBySlug(slug, locale));
    }
}