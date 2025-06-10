package com.unillanos.main.services;

import com.unillanos.main.models.Estacion;
import com.unillanos.main.models.Post;
import com.unillanos.main.repositories.ComentarioRepository;
import com.unillanos.main.repositories.EstacionRepository;
import com.unillanos.main.repositories.PostRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EstacionService {

    private final EstacionRepository estacionRepository;
    private final PostRepository postRepository;
    private final ComentarioRepository comentarioRepository;

    public Estacion crearEstacion(Estacion estacion) {
        return estacionRepository.save(estacion);
    }

    public List<Estacion> listarEstaciones() {
        return estacionRepository.findAll();
    }

    public Estacion obtenerEstacionPorId(Long id) {
        return estacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estación no encontrada"));
    }

    public Estacion actualizarEstacion(Long id, Estacion estacionActualizada) {
        Estacion estacion = obtenerEstacionPorId(id);

        estacion.setTitulo(estacionActualizada.getTitulo());
        estacion.setDescripcionCorta(estacionActualizada.getDescripcionCorta());
        estacion.setDescripcionLarga(estacionActualizada.getDescripcionLarga());
        estacion.setImagenDestacadaUrl(estacionActualizada.getImagenDestacadaUrl());
        estacion.setImagenesCarruselUrls(estacionActualizada.getImagenesCarruselUrls());

        return estacionRepository.save(estacion);
    }

    public void eliminarEstacion(Long id) {
        Estacion estacion = obtenerEstacionPorId(id);
        List<Post> posts = postRepository.findByEstacion(estacion);

        for (Post post : posts) {
            comentarioRepository.deleteByPost(post);
        }
        postRepository.deleteAll(posts);
        estacionRepository.delete(estacion);
    }


}
