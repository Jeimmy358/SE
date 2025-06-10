package com.unillanos.main.services;

import com.unillanos.main.exceptions.TokenExpiredException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.unillanos.main.models.Users;
import lombok.RequiredArgsConstructor;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final RedisTemplate<String, String> redisTemplate;

    private static final long EXPIRACION_TOKEN = 60 * 60 * 1000; // 1 hora

    // Generar un token único para la recuperación
    public String generarTokenRecuperacion(Users usuario) {
        try {
            String token = UUID.randomUUID().toString();
            redisTemplate.opsForValue().set(token, usuario.getEmail(), EXPIRACION_TOKEN, TimeUnit.MILLISECONDS);
            return token;
        } catch (Exception e) {
            // Log de error si algo falla
            System.out.println("Error al generar el token: " + e.getMessage());
            throw new RuntimeException("Error al generar el token");
        }
    }
    

    // Validar token y devolver el correo del usuario
    public String validarTokenRecuperacion(String token) {
        String email = redisTemplate.opsForValue().get(token);
        
        if (email == null) {
            throw new TokenExpiredException("Token inválido o expirado");
        }
        
        return email; 
    }
}
