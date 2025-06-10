package com.unillanos.main.services;

import com.unillanos.main.models.Comentario;
import com.unillanos.main.models.Post;
import com.unillanos.main.models.Users;
import com.unillanos.main.repositories.ComentarioRepository;
import com.unillanos.main.repositories.PostRepository;
import com.unillanos.main.repositories.UsersRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComentarioService {
    private final ComentarioRepository comentarioRepository;
    private final UsersRepository userRepository;
    private final PostRepository postRepository;

    public Comentario crearComentario(String emailUsuario, Long postId, Comentario comentario) {
        Users usuario = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post no encontrado"));

        comentario.setUsuario(usuario);
        comentario.setPost(post);
        comentario.setFechaComentario(LocalDateTime.now());

        return comentarioRepository.save(comentario);
    }

    public List<Comentario> obtenerComentariosPorPost(Long postId) {
        return comentarioRepository.findByPostId(postId);
    }

    public Comentario editarComentario(Long comentarioId, String emailUsuario, Comentario actualizado) {
        Comentario comentario = comentarioRepository.findById(comentarioId)
                .orElseThrow(() -> new EntityNotFoundException("Comentario no encontrado"));

        if (!comentario.getUsuario().getEmail().equals(emailUsuario)) {
            throw new SecurityException("No tienes permiso para editar este comentario");
        }

        comentario.setContenido(actualizado.getContenido());
        return comentarioRepository.save(comentario);
    }

    public void eliminarComentario(Long comentarioId, String emailUsuario) {
        Comentario comentario = comentarioRepository.findById(comentarioId)
                .orElseThrow(() -> new EntityNotFoundException("Comentario no encontrado"));

        Users usuarioSolicitante = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        boolean esPropietario = comentario.getUsuario().getEmail().equals(emailUsuario);
        boolean esAdmin = usuarioSolicitante.getRole().name().equals("ADMIN");

        if (!esPropietario && !esAdmin) {
            throw new SecurityException("No tienes permiso para eliminar este comentario");
        }

        comentarioRepository.delete(comentario);
    }
}
