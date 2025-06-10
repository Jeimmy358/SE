package com.unillanos.main.controllers;

import com.unillanos.main.models.Post;
import com.unillanos.main.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estaciones/{estacionId}/posts") 
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<Post> crearPost(@PathVariable Long estacionId, Authentication auth, @RequestBody Post post) {
        Post nuevo = postService.crearPost(auth.getName(), estacionId, post);
        return ResponseEntity.ok(nuevo);
    }

    @GetMapping
    public ResponseEntity<List<Post>> obtenerTodosPorEstacion(@PathVariable Long estacionId) {
        return ResponseEntity.ok(postService.obtenerPostsPorEstacion(estacionId));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> obtenerPorId(@PathVariable Long estacionId, @PathVariable Long postId) {
        return postService.obtenerPostPorId(estacionId, postId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{postId}")
    public ResponseEntity<Post> editar(@PathVariable Long estacionId, @PathVariable Long postId, @RequestBody Post postActualizado, Authentication auth) {
        return ResponseEntity.ok(postService.editarPost(estacionId, postId, auth.getName(), postActualizado));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> eliminar(@PathVariable Long estacionId, @PathVariable Long postId, Authentication auth) {
        postService.eliminarPost(estacionId, postId, auth.getName());
        return ResponseEntity.ok().build();
    }
}
