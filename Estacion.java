package com.unillanos.main.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
public class Estacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    @Column(length = 500)
    private String descripcionCorta;

    @Column(columnDefinition = "TEXT")
    private String descripcionLarga;

    private String imagenDestacadaUrl;

    @Column(nullable = false)
    private Double latitud;

    @Column(nullable = false)
    private Double longitud;

    @ElementCollection
    private List<String> imagenesCarruselUrls;

    @OneToMany(mappedBy = "estacion", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("estacion-posts")
    private List<Post> posts;
}
