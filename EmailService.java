package com.unillanos.main.services;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    public void enviarCorreo(String destinatario, String asunto, String mensajeHTML) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        // Crear un objeto MimeMessageHelper para añadir contenido HTML
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true); 

        helper.setTo(destinatario);
        helper.setSubject(asunto);
        helper.setText(mensajeHTML, true);
        javaMailSender.send(mimeMessage);
    }
}
