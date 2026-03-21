package com.gioele.portfolio.contact;

import com.gioele.portfolio.shared.AppProperties;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final JavaMailSender mailSender;
    private final AppProperties appProperties;
    private final HCaptchaService hCaptchaService;

    @PostMapping
    public ResponseEntity<Void> contact(@Valid @RequestBody ContactRequest request) {
        // honeypot — se valorizzato è un bot
        if (request.website() != null && !request.website().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        if (!hCaptchaService.verify(request.captchaToken())) {
            return ResponseEntity.badRequest().build();
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(appProperties.getMail().getFrom());
        message.setTo(appProperties.getMail().getTo());
        message.setSubject("Nuovo contatto da " + request.nome());
        message.setText(
                "Nome: " + request.nome() + "\n" +
                        "Email: " + request.email() + "\n\n" +
                        request.messaggio()
        );
        mailSender.send(message);
        return ResponseEntity.ok().build();
    }
}