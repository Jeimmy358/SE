package com.unillanos.main.controllers;

import com.unillanos.main.models.Comentario;
import com.unillanos.main.services.ComentarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estaciones/{estacionId}/posts/{postId}/comentarios")
@RequiredArgsConstructor
public class ComentarioController {

    private final ComentarioService comentarioService;

    // Crear un comentario en un post
    @PostMapping
    public ResponseEntity<Comentario> crearComentario(@PathVariable Long estacionId, @PathVariable Long postId,
            @RequestBody Comentario comentario, Authentication auth) {
        Comentario nuevoComentario = comentarioService.crearComentario(auth.getName(), postId, comentario);
        return ResponseEntity.ok(nuevoComentario);
    }

    // Obtener todos los comentarios de un post
    @GetMapping
    public ResponseEntity<List<Comentario>> obtenerComentarios(@PathVariable Long estacionId,
            @PathVariable Long postId) {
        List<Comentario> comentarios = comentarioService.obtenerComentariosPorPost(postId);
        return ResponseEntity.ok(comentarios);
    }

    // Editar un comentario
    @PutMapping("/{comentarioId}")
    public ResponseEntity<Comentario> editarComentario(@PathVariable Long estacionId, @PathVariable Long postId,
            @PathVariable Long comentarioId, @RequestBody Comentario comentarioActualizado, Authentication auth) {
        Comentario comentarioEditado = comentarioService.editarComentario(comentarioId, auth.getName(),
                comentarioActualizado);
        return ResponseEntity.ok(comentarioEditado);
    }

    // Eliminar un comentario
    @DeleteMapping("/{comentarioId}")
    public ResponseEntity<Void> eliminarComentario(@PathVariable Long estacionId, @PathVariable Long postId,
            @PathVariable Long comentarioId, Authentication auth) {
        comentarioService.eliminarComentario(comentarioId, auth.getName());
        return ResponseEntity.noContent().build();
    }
}
