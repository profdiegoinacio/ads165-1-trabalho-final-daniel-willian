package com.example.backend.controller;

import com.example.backend.model.Reclamacao;
import com.example.backend.model.Usuario;
import com.example.backend.repository.ReclamacaoRepository;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reclamacoes")
@CrossOrigin(origins = "*")
public class ReclamacaoController {

    @Autowired
    private ReclamacaoRepository reclamacaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Reclamacao> listarReclamacoes() {
        return reclamacaoRepository.findAll();
    }

    @PostMapping
    public Reclamacao criarReclamacao(@RequestBody Reclamacao reclamacao) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(reclamacao.getUsuario().getId());
        if (usuarioOptional.isPresent()) {
            reclamacao.setUsuario(usuarioOptional.get());
            reclamacao.setDtInsercao(LocalDateTime.now());
            return reclamacaoRepository.save(reclamacao);
        } else {
            throw new RuntimeException("Usuário não encontrado");
        }
    }

    @PutMapping("/{id}/status")
    public Reclamacao atualizarStatus(@PathVariable Long id, @RequestBody String novoStatus) {
        Optional<Reclamacao> reclamacaoOptional = reclamacaoRepository.findById(id);
        if (reclamacaoOptional.isPresent()) {
            Reclamacao reclamacao = reclamacaoOptional.get();
            reclamacao.setStatus(novoStatus.replace("\"", ""));
            return reclamacaoRepository.save(reclamacao);
        } else {
            throw new RuntimeException("Reclamação não encontrada");
        }
    }

}
