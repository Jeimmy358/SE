package com.unillanos.main.repositories;

import com.unillanos.main.models.Estacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstacionRepository extends JpaRepository<Estacion, Long> {
}
