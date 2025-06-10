package com.unillanos.main.controllers;

import com.unillanos.main.models.Estacion;
import com.unillanos.main.services.EstacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/estaciones")
@RequiredArgsConstructor
public class EstacionController {

    private final EstacionService estacionService;

    @GetMapping
    public ResponseEntity<List<Estacion>> listar() {
        return ResponseEntity.ok(estacionService.listarEstaciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estacion> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(estacionService.obtenerEstacionPorId(id));
    }
}
