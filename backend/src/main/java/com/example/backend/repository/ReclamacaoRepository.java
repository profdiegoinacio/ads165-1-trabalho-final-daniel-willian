package com.example.backend.repository;

import com.example.backend.model.Reclamacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReclamacaoRepository extends JpaRepository<Reclamacao, Long> {
}
