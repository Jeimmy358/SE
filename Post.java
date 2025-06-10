package com.unillanos.main.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String contenido;

    private LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonBackReference("usuario-posts")
    private Users usuario;

    @ManyToOne
    @JoinColumn(name = "estacion_id")
    @JsonBackReference("estacion-posts")
    private Estacion estacion;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("post-comentarios")
    private List<Comentario> comentarios = new ArrayList<>();

    @JsonProperty("autorNombre") // Incluir el nombre del autor en el JSON
    public String getAutorNombre() {
        return this.usuario != null ? this.usuario.getNombre() : "Desconocido";
    }
}
