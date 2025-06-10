package com.unillanos.main.services;

import com.unillanos.main.exceptions.AuthenticationFailedException;
import com.unillanos.main.models.Role;
import com.unillanos.main.models.Users;
import com.unillanos.main.repositories.UsersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Registro para incluir roles
    public Users registerUser(Users user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("El correo ya está registrado");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Cifra la contraseña
        user.setRole(Role.USER); // Asigna por defecto el rol USER
        return userRepository.save(user);
    }

    public Optional<Users> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    // Autenticación con manejo de roles
    public Users authenticateUser(String email, String password) {
        if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
            throw new AuthenticationFailedException("El correo o la contraseña no pueden estar vacíos");
        }

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthenticationFailedException("Credenciales inválidas"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new AuthenticationFailedException("Credenciales inválidas");
        }

        return user; // Retorna el usuario con su rol incluido
    }

    // Cambiar el rol de un usuario
    public Users updateUserRole(String email, Role newRole) {
        // Verificar si el usuario existe
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Verificar que el nuevo rol es válido (ADMIN o USER)
        if (newRole != Role.ADMIN && newRole != Role.USER) {
            throw new IllegalArgumentException("Rol inválido");
        }

        // Cambiar el rol del usuario
        user.setRole(newRole);

        // Guardar el usuario con el nuevo rol
        return userRepository.save(user);
    }
}
