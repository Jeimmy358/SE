package com.unillanos.main.repositories;

import com.unillanos.main.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email); // Para buscar usuarios por email

    boolean existsByEmail(String email); // Para verificar si el email ya está registrado
}
