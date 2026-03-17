package com.gioele.portfolio.contact;

import com.gioele.portfolio.shared.AppProperties;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

    @PostMapping
    public ResponseEntity<Void> contact(@Valid @RequestBody ContactRequest request) {
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