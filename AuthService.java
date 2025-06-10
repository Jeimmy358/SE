package com.unillanos.main.services;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.unillanos.main.models.Users;
import com.unillanos.main.repositories.UsersRepository;

import java.time.LocalDate;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsersRepository usersRepository;
    private final EmailService emailService; // Servicio para enviar correos
    private final TokenService tokenService; // Genera y valida tokens de recuperación de contraseña
    private int añoActual = LocalDate.now().getYear();
    // Enviar correo para recuperar la contraseña
    public void enviarCorreoRecuperacion(String email) throws MessagingException {
        Users usuario = usersRepository.findByEmail(email)
                .orElseThrow(() -> {
                    return new UsernameNotFoundException("Usuario no encontrado");
                });
    
        // log después de encontrar el usuario
        System.out.println("Usuario encontrado: " + usuario.getEmail());
    
        String token = tokenService.generarTokenRecuperacion(usuario);

        String enlaceRecuperacion = "http://localhost:3000/reset-password?token=" + token;
        System.out.println("Enlace de recuperación: " + enlaceRecuperacion);  

        String mensajeHTML = "<!DOCTYPE html>" +
                "<html lang=\"es\">" +
                "<head>" +
                "<meta charset=\"UTF-8\">" +
                "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "<title>Recuperación de Contraseña</title>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f9; }" +
                ".container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }" +
                ".header { text-align: center; color: #2c3e50; }" +
                ".header h2 { margin: 0; }" +
                ".content { text-align: center; font-size: 16px; color: #34495e; line-height: 1.6; }" +
                ".button { display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; }" +
                ".button:hover { background-color: #2980b9; }" +
                ".footer { text-align: center; margin-top: 30px; font-size: 12px; color: #7f8c8d; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class=\"container\">" +
                "<div class=\"header\"><h2>Recuperación de Contraseña</h2></div>" +
                "<div class=\"content\">" +
                "<p>Hola,</p>" +
                "<p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva:</p>" +
                "<a href=\"" + enlaceRecuperacion + "\" class=\"button\">Restablecer mi Contraseña</a>" +
                "<p>Si no solicitaste esta acción, puedes ignorar este mensaje.</p>" +
                "</div>" +
                "<div class=\"footer\">" +
                "<p>&copy; "+ añoActual + "Universidad de los llanos. Todos los derechos reservados.</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    
        emailService.enviarCorreo(usuario.getEmail(), "Recuperación de contraseña", mensajeHTML);
        System.out.println("Correo enviado a: " + usuario.getEmail());
    }
    
    

    // Restablecer la contraseña
    public void restablecerContraseña(String token, String newPassword) {
        String email = tokenService.validarTokenRecuperacion(token);

        Users usuario = usersRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        usuario.setPassword(new BCryptPasswordEncoder().encode(newPassword)); // Cifra la nueva contraseña
        usersRepository.save(usuario);
    }
}
