package com.unillanos.main.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

        @Autowired
        private JwtService jwtService;

        @Bean
        PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public JwtAuthFilter jwtAuthFilter() {
                return new JwtAuthFilter(jwtService);
        }

        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(csrf -> csrf.disable())
                                .cors(cors -> cors.configurationSource(request -> {
                                        CorsConfiguration config = new CorsConfiguration();
                                        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
                                        config.setAllowedMethods(
                                                        Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                                        config.setAllowedHeaders(Arrays.asList("*"));
                                        config.setAllowCredentials(true);
                                        return config;
                                }))
                                .authorizeHttpRequests(auth -> auth
                                                // Rutas públicas
                                                .requestMatchers(HttpMethod.GET, "/api/estaciones",
                                                                "/api/news/environment",
                                                                "/api/estaciones/{id}",
                                                                "/api/estaciones/{estacionId}/posts",
                                                                "/api/estaciones/{estacionId}/posts/{postId}",
                                                                "/api/estaciones/{estacionId}/posts/{postId}/comentarios")
                                                .permitAll()

                                                // Rutas para usuarios autenticados (USER o ADMIN)
                                                .requestMatchers(HttpMethod.POST, "/api/estaciones/{estacionId}/posts",
                                                                "/api/estaciones/{estacionId}/posts/{postId}/comentarios")
                                                .hasAnyAuthority("USER", "ADMIN")
                                                .requestMatchers(HttpMethod.PUT,
                                                                "/api/estaciones/{estacionId}/posts/{postId}",
                                                                "/api/estaciones/{estacionId}/posts/{postId}/comentarios/{comentarioId}")
                                                .hasAnyAuthority("USER", "ADMIN")
                                                .requestMatchers(HttpMethod.DELETE,
                                                                "/api/estaciones/{estacionId}/posts/{postId}",
                                                                "/api/estaciones/{estacionId}/posts/{postId}/comentarios/{comentarioId}")
                                                .hasAnyAuthority("USER", "ADMIN")

                                                // Rutas exclusivas para ADMIN
                                                .requestMatchers(HttpMethod.POST, "/api/imagenes/**")
                                                .hasAuthority("ADMIN")
                                                .requestMatchers(HttpMethod.PUT, "/api/admin/**", "/api/admin/estaciones/**").hasAuthority("ADMIN")
                                                .requestMatchers(HttpMethod.DELETE, "/api/admin/estaciones/**")
                                                .hasAuthority("ADMIN")

                                                // Rutas para usuarios en general
                                                .requestMatchers(HttpMethod.GET, "/users/**")
                                                .hasAnyAuthority("USER", "ADMIN")
                                                .requestMatchers("/api/auth/**", "/api/users/register", "/api/auth/forgot-password", "/api/auth/reset-password").permitAll()


                                                // Cualquier otra ruta debe estar autenticada
                                                .anyRequest().authenticated())
                                .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class)
                                .httpBasic(httpBasic -> httpBasic.disable());

                return http.build();
        }

}
