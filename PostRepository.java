package com.unillanos.main.repositories;

import com.unillanos.main.models.Post;
import com.unillanos.main.models.Estacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByEstacion(Estacion estacion);
    void deleteByEstacion(Estacion estacion);
}
