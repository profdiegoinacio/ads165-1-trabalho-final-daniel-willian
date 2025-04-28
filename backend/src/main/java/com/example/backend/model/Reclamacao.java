package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Reclamacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String endereco;
    private String detalhes;
    private LocalDateTime dtInsercao;
    private String status;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Reclamacao() {
        this.dtInsercao = LocalDateTime.now();
        this.status = "EM_ABERTO";
    }

    public Reclamacao(String endereco, String detalhes, Usuario usuario) {
        this.endereco = endereco;
        this.detalhes = detalhes;
        this.usuario = usuario;
        this.dtInsercao = LocalDateTime.now();
        this.status = "EM_ABERTO";
    }

    // Getters e setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getEndereco() { return endereco; }

    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getDetalhes() { return detalhes; }

    public void setDetalhes(String detalhes) { this.detalhes = detalhes; }

    public LocalDateTime getDtInsercao() { return dtInsercao; }

    public void setDtInsercao(LocalDateTime dtInsercao) { this.dtInsercao = dtInsercao; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public Usuario getUsuario() { return usuario; }

    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}

