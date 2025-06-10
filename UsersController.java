package com.unillanos.main.controllers;

import com.unillanos.main.models.Users;
import com.unillanos.main.models.Role; // Asumiendo que tienes un enum Role en tu modelo de Users
import com.unillanos.main.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    // Registro de usuario (Público, sin autenticación)
    @PostMapping("/register")
    public ResponseEntity<Users> registerUser(@RequestBody Users user) {
        Users newUser = usersService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }

    // Obtener todos los usuarios (SOLO ADMIN)
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> usersList = usersService.getAllUsers();
        return ResponseEntity.ok(usersList);
    }

    // Obtener usuario por email (Cualquier usuario autenticado)
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    @GetMapping("/{email}")
    public ResponseEntity<Users> getUserByEmail(@PathVariable String email) {
        return usersService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Cambiar el rol de un usuario (SOLO ADMIN)
    @PutMapping("/{email}/role")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Users> updateUserRole(@PathVariable String email, @RequestParam Role newRole) {
        try {
            Users updatedUser = usersService.updateUserRole(email, newRole);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    @GetMapping("/me")
    public ResponseEntity<Users> getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return usersService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
