package com.unillanos.main.controllers;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.unillanos.main.models.Estacion;
import com.unillanos.main.services.EstacionService;
import com.unillanos.main.services.S3Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/estaciones")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
public class EstacionAdminController {

    private final EstacionService estacionService;
    private final S3Service s3Service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> crear(
            @RequestParam("titulo") String titulo,
            @RequestParam("descripcionCorta") String descripcionCorta,
            @RequestParam("descripcionLarga") String descripcionLarga,
            @RequestParam("latitud") Double latitud,
            @RequestParam("longitud") Double longitud,
            @RequestParam("portada") MultipartFile portada,
            @RequestParam("carrusel") List<MultipartFile> carrusel) {
        try {
            // Validación de latitud y longitud
            if (latitud < -90 || latitud > 90) {
                return ResponseEntity.badRequest().body("Latitud inválida. Debe estar entre -90 y 90.");
            }
            if (longitud < -180 || longitud > 180) {
                return ResponseEntity.badRequest().body("Longitud inválida. Debe estar entre -180 y 180.");
            }

            // Subir las imágenes
            String portadaUrl = s3Service.uploadImage(portada);
            List<String> carruselUrls = carrusel.stream()
                    .map(file -> {
                        try {
                            return s3Service.uploadImage(file);
                        } catch (Exception e) {
                            throw new RuntimeException("Error al subir imagen del carrusel", e);
                        }
                    }).toList();

            // Crear la estación
            Estacion estacion = new Estacion();
            estacion.setTitulo(titulo);
            estacion.setDescripcionCorta(descripcionCorta);
            estacion.setDescripcionLarga(descripcionLarga);
            estacion.setLatitud(latitud);
            estacion.setLongitud(longitud);
            estacion.setImagenDestacadaUrl(portadaUrl);
            estacion.setImagenesCarruselUrls(carruselUrls);

            // Guardar la estación en la base de datos
            return ResponseEntity.ok(estacionService.crearEstacion(estacion));
        } catch (Exception e) {
            System.out.println("Error en creación: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error al crear la estación: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> actualizar(
            @PathVariable Long id,
            @RequestParam("titulo") String titulo,
            @RequestParam("descripcionCorta") String descripcionCorta,
            @RequestParam("descripcionLarga") String descripcionLarga,
            @RequestParam("latitud") Double latitud,
            @RequestParam("longitud") Double longitud,
            @RequestParam(value = "portada", required = false) MultipartFile portada,
            @RequestParam(value = "carrusel", required = false) List<MultipartFile> carrusel) {
        try {
            // Validación de latitud y longitud
            if (latitud < -90 || latitud > 90) {
                return ResponseEntity.badRequest().body("Latitud inválida. Debe estar entre -90 y 90.");
            }
            if (longitud < -180 || longitud > 180) {
                return ResponseEntity.badRequest().body("Longitud inválida. Debe estar entre -180 y 180.");
            }

            // Obtener la estación por ID
            Estacion estacion = estacionService.obtenerEstacionPorId(id);
            System.out.println("===== ACTUALIZANDO ESTACIÓN ID: " + id + " =====");

            // Imagen de portada: eliminar la anterior y subir la nueva si existe
            if (portada != null) {
                System.out.println("Imagen de portada nueva: " + portada.getOriginalFilename());

                // Eliminar la portada anterior si existe
                if (estacion.getImagenDestacadaUrl() != null) {
                    System.out.println("Eliminando imagen de portada anterior: " + estacion.getImagenDestacadaUrl());
                    s3Service.deleteImage(estacion.getImagenDestacadaUrl());
                }

                // Subir la nueva portada
                String nuevaPortadaUrl = s3Service.uploadImage(portada);
                estacion.setImagenDestacadaUrl(nuevaPortadaUrl);
                System.out.println("Portada nueva subida correctamente: " + nuevaPortadaUrl);
            }

            // Carrusel: agregar nuevas imágenes a las existentes
            if (carrusel != null && !carrusel.isEmpty()) {
                System.out.println("Cantidad de imágenes en carrusel a agregar: " + carrusel.size());

                List<String> nuevasUrls = carrusel.stream()
                        .map(file -> {
                            try {
                                return s3Service.uploadImage(file);
                            } catch (Exception e) {
                                throw new RuntimeException("Error al subir imagen del carrusel", e);
                            }
                        }).toList();

                List<String> actuales = estacion.getImagenesCarruselUrls();
                if (actuales == null) {
                    actuales = nuevasUrls;
                } else {
                    actuales.addAll(nuevasUrls);
                }
                estacion.setImagenesCarruselUrls(actuales);
                System.out.println("Carrusel actualizado con nuevas imágenes");
            }

            // Actualizar otros detalles de la estación
            estacion.setTitulo(titulo);
            estacion.setDescripcionCorta(descripcionCorta);
            estacion.setDescripcionLarga(descripcionLarga);
            estacion.setLatitud(latitud);
            estacion.setLongitud(longitud);

            return ResponseEntity.ok(estacionService.actualizarEstacion(id, estacion));
        } catch (Exception e) {
            System.out.println("Error al actualizar estación: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error al actualizar la estación: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            Estacion estacion = estacionService.obtenerEstacionPorId(id);
            System.out.println("===== ELIMINANDO ESTACIÓN ID: " + id + " =====");

            // Eliminar imagen de portada si existe
            if (estacion.getImagenDestacadaUrl() != null) {
                System.out.println("Eliminando imagen de portada: " + estacion.getImagenDestacadaUrl());
                s3Service.deleteImage(estacion.getImagenDestacadaUrl());
            }

            // Eliminar imágenes del carrusel si existen
            if (estacion.getImagenesCarruselUrls() != null) {
                estacion.getImagenesCarruselUrls().forEach(url -> {
                    System.out.println("Eliminando imagen del carrusel: " + url);
                    s3Service.deleteImage(url);
                });
            }

            estacionService.eliminarEstacion(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println("Error al eliminar estación: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}/carrusel/{indice}")
    public ResponseEntity<Void> eliminarImagenCarrusel(
            @PathVariable Long id,
            @PathVariable int indice) {
        try {
            Estacion estacion = estacionService.obtenerEstacionPorId(id);
            List<String> carrusel = estacion.getImagenesCarruselUrls();

            if (carrusel == null || carrusel.isEmpty()) {
                System.out.println("No hay imágenes en el carrusel.");
                return ResponseEntity.badRequest().build();
            }

            if (indice < 0 || indice >= carrusel.size()) {
                System.out.println("Índice inválido: " + indice);
                return ResponseEntity.badRequest().build();
            }

            // Obtener y eliminar la imagen en S3
            String urlAEliminar = carrusel.get(indice);
            System.out.println("Eliminando imagen del carrusel (índice " + indice + "): " + urlAEliminar);
            s3Service.deleteImage(urlAEliminar);

            // Remover la URL de la lista y guardar cambios
            carrusel.remove(indice);
            estacion.setImagenesCarruselUrls(carrusel);
            estacionService.actualizarEstacion(id, estacion);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println("Error al eliminar imagen del carrusel: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
