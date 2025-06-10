package com.unillanos.main.config;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Excluir rutas públicas del filtro JWT
        if (request.getRequestURI().equals("/api/auth/forgot-password")
                || request.getRequestURI().equals("/api/auth/reset-password")
                || request.getRequestURI().equals("/api/users/register")
                || request.getRequestURI().equals("/api/news") 
                || request.getRequestURI().equals("/api/auth/login")
                || request.getRequestURI().equals("/api/estaciones")) {
            filterChain.doFilter(request, response); // Continuar sin hacer nada más
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            System.out.println("Token recibido: " + token);

            String username = jwtService.extractUsername(token);
            String role = jwtService.extractRole(token);

            System.out.println("Username extraído: " + username);
            System.out.println("Rol extraído: " + role);

            if (username != null && role != null && jwtService.validateToken(token, username)) {
                System.out.println("Token válido, autenticando...");

                List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));

                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println("Autenticación configurada para: " + username);
            } else {
                System.out.println("Token inválido o expirado");
            }
        } else {
            System.out.println("No se encontró encabezado Authorization válido");
        }

        filterChain.doFilter(request, response);
    }
}
