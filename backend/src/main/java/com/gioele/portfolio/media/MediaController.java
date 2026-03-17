package com.gioele.portfolio.media;

import com.gioele.portfolio.media.dto.MediaUploadResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin/media")
@RequiredArgsConstructor
public class MediaController {

    private final MediaService mediaService;

    @PostMapping("/upload")
    public ResponseEntity<MediaUploadResponseDTO> upload(
            @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(mediaService.upload(file));
    }

    @DeleteMapping("/{filename}")
    public ResponseEntity<Void> delete(@PathVariable String filename) throws IOException {
        mediaService.delete(filename);
        return ResponseEntity.noContent().build();
    }
}