package com.unillanos.main.services;

import com.unillanos.main.models.Estacion;
import com.unillanos.main.models.Post;
import com.unillanos.main.models.Users;
import com.unillanos.main.repositories.EstacionRepository;
import com.unillanos.main.repositories.PostRepository;
import com.unillanos.main.repositories.UsersRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UsersRepository userRepository;
    private final EstacionRepository estacionRepository;

    public Post crearPost(String emailUsuario, Long estacionId, Post post) {
        Users user = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        
        Estacion estacion = estacionRepository.findById(estacionId)
                .orElseThrow(() -> new EntityNotFoundException("Estación no encontrada"));

        post.setUsuario(user);
        post.setEstacion(estacion);
        post.setFechaCreacion(LocalDateTime.now());

        return postRepository.save(post);
    }

    public List<Post> obtenerPostsPorEstacion(Long estacionId) {
        Estacion estacion = estacionRepository.findById(estacionId)
                .orElseThrow(() -> new EntityNotFoundException("Estación no encontrada"));

        return postRepository.findByEstacion(estacion);
    }

    public Optional<Post> obtenerPostPorId(Long estacionId, Long postId) {
        Estacion estacion = estacionRepository.findById(estacionId)
                .orElseThrow(() -> new EntityNotFoundException("Estación no encontrada"));

        return postRepository.findById(postId)
                .filter(post -> post.getEstacion().getId().equals(estacion.getId()));
    }

    public Post editarPost(Long estacionId, Long postId, String emailUsuario, Post postActualizado) {
        Post post = postRepository.findById(postId)
                .filter(p -> p.getEstacion().getId().equals(estacionId))
                .orElseThrow(() -> new EntityNotFoundException("Post no encontrado o no pertenece a la estación"));

        if (!post.getUsuario().getEmail().equals(emailUsuario)) {
            throw new SecurityException("No tienes permiso para editar este post");
        }

        post.setTitulo(postActualizado.getTitulo());
        post.setContenido(postActualizado.getContenido());
        return postRepository.save(post);
    }

    public void eliminarPost(Long estacionId, Long postId, String emailUsuario) {
        Post post = postRepository.findById(postId)
                .filter(p -> p.getEstacion().getId().equals(estacionId))
                .orElseThrow(() -> new EntityNotFoundException("Post no encontrado o no pertenece a la estación"));

        Users usuarioSolicitante = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        boolean esPropietario = post.getUsuario().getEmail().equals(emailUsuario);
        boolean esAdmin = usuarioSolicitante.getRole().name().equals("ADMIN");

        if (!esPropietario && !esAdmin) {
            throw new SecurityException("No tienes permiso para eliminar este post");
        }

        postRepository.delete(post);
    }
}
