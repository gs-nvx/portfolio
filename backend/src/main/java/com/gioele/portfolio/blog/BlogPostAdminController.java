package com.gioele.portfolio.blog;

import com.gioele.portfolio.blog.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/admin/blog")
@RequiredArgsConstructor
public class BlogPostAdminController {

    private final BlogPostService blogPostService;

    @GetMapping
    public ResponseEntity<Page<BlogPostSummaryDTO>> getAllPosts(
            @RequestParam(defaultValue = "it") String locale,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(blogPostService.getAllPosts(locale, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPostDetailDTO> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(blogPostService.getPostById(id));
    }

    @PostMapping
    public ResponseEntity<BlogPostDetailDTO> createPost(
            @Valid @RequestBody BlogPostCreateDTO dto) {
        BlogPostDetailDTO created = blogPostService.createPost(dto);
        return ResponseEntity.created(
                URI.create("/api/admin/blog/" + created.id())
        ).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogPostDetailDTO> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody BlogPostUpdateDTO dto) {
        return ResponseEntity.ok(blogPostService.updatePost(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        blogPostService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}