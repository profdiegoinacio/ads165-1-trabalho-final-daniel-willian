package com.example.backend.controller;

import com.example.backend.Usuario;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private List<Usuario> usuarios = new ArrayList<>();
    private AtomicLong idCounter = new AtomicLong();

    public UsuarioController() {
        usuarios.add(new Usuario(idCounter.incrementAndGet(), "Daniel Albuquerque", "Av Brasil, 111", "daniel@upf.br", "549830923092", "usuario123"));
        usuarios.add(new Usuario(idCounter.incrementAndGet(), "Willian Calebe", "Av Brasil, 111", "willian@upf.br", "5498849384938", "usuario456"));
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarios;
    }

    @PostMapping
    public Usuario cadastrarUsuario(@RequestBody Usuario usuario) {
        usuario.setId(idCounter.incrementAndGet());
        usuarios.add(usuario);
        return usuario;
    }

    @PutMapping("/{id}")
    public Usuario atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        Optional<Usuario> usuarioExistente = usuarios.stream()
                .filter(u -> u.getId().equals(id))
                .findFirst();

        if (usuarioExistente.isPresent()) {
            Usuario usuario = usuarioExistente.get();
            usuario.setNome(usuarioAtualizado.getNome());
            usuario.setEndereco(usuarioAtualizado.getEndereco());
            usuario.setEmail(usuarioAtualizado.getEmail());
            usuario.setTelefone(usuarioAtualizado.getTelefone());
            usuario.setSenha(usuarioAtualizado.getSenha()); // Atualiza senha também
            return usuario;
        } else {
            throw new RuntimeException("Usuário não encontrado com ID: " + id);
        }
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Long id) {
        boolean removido = usuarios.removeIf(usuario -> usuario.getId().equals(id));
        if (!removido) {
            throw new RuntimeException("Usuário não encontrado para exclusão com ID: " + id);
        }
    }
}
