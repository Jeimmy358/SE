package com.unillanos.main.controllers;

import com.unillanos.main.exceptions.AuthenticationFailedException;
import com.unillanos.main.exceptions.TokenExpiredException;
import com.unillanos.main.models.Users;
import com.unillanos.main.services.AuthService;
import com.unillanos.main.services.UsersService;
import com.unillanos.main.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsersService usersService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthService authService; // Servicio para manejar la recuperación de contraseña

    // Ruta para iniciar sesión
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        try {
            Users authenticatedUser = usersService.authenticateUser(email, password);
            String token = jwtService.generateToken(authenticatedUser.getEmail(), authenticatedUser.getRole().name());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (AuthenticationFailedException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }

    // Ruta para solicitar la recuperación de la contraseña
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            authService.enviarCorreoRecuperacion(email);
            return ResponseEntity.ok("Si el correo existe, se ha enviado un enlace para restablecer la contraseña.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Correo no encontrado.");
        }
    }

    // Ruta para restablecer la contraseña
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody Map<String, String> request) {
        String newPassword = request.get("newPassword");
        try {
            authService.restablecerContraseña(token, newPassword);
            return ResponseEntity.ok("Contraseña restablecida correctamente.");
        } catch (TokenExpiredException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ocurrió un error al restablecer la contraseña.");
        }
    }
}
