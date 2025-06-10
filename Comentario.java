package com.unillanos.main.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String contenido;

    private LocalDateTime fechaComentario;

    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonBackReference("post-comentarios")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonBackReference("usuario-comentarios")
    private Users usuario;

    @JsonProperty("autorNombre") // Incluir el nombre del autor en el JSON
    public String getAutorNombre() {
        return this.usuario != null ? this.usuario.getNombre() : "Desconocido";
    }
}
