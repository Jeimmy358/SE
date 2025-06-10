package com.unillanos.main.repositories;

import com.unillanos.main.models.Comentario;
import com.unillanos.main.models.Post;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    List<Comentario> findByPostId(Long postId);
    void deleteByPost(Post post);
}
