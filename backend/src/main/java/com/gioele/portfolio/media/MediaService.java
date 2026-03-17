package com.gioele.portfolio.media;

import com.gioele.portfolio.media.dto.MediaUploadResponseDTO;
import com.gioele.portfolio.shared.AppProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MediaService {

    private static final List<String> ALLOWED_TYPES = List.of(
            "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"
    );
    private static final long MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

    private final AppProperties appProperties;

    public MediaUploadResponseDTO upload(MultipartFile file) throws IOException {
        validate(file);

        String extension = getExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID() + "." + extension;

        Path uploadDir = Paths.get(appProperties.getUploads().getPath());
        Files.createDirectories(uploadDir);

        Path destination = uploadDir.resolve(filename);
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

        String url = appProperties.getUploads().getBaseUrl() + "/" + filename;
        return new MediaUploadResponseDTO(filename, url);
    }

    public void delete(String filename) throws IOException {
        // Sicurezza: impedisce path traversal
        if (filename.contains("..") || filename.contains("/") || filename.contains("\\")) {
            throw new IllegalArgumentException("Nome file non valido");
        }

        Path filePath = Paths.get(appProperties.getUploads().getPath()).resolve(filename);
        Files.deleteIfExists(filePath);
    }

    private void validate(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File vuoto");
        }
        if (file.getSize() > MAX_SIZE_BYTES) {
            throw new IllegalArgumentException("File troppo grande (max 5MB)");
        }
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new IllegalArgumentException("Tipo file non supportato");
        }
    }

    private String getExtension(String originalFilename) {
        if (originalFilename == null || !originalFilename.contains(".")) {
            return "bin";
        }
        return originalFilename.substring(originalFilename.lastIndexOf('.') + 1).toLowerCase();
    }
}