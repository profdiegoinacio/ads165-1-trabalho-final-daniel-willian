package com.example.backend.controller;

import com.example.backend.Usuario;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private List<Usuario> usuarios = new ArrayList<>();
    private AtomicLong idCounter = new AtomicLong();

    public UsuarioController() {
        // Colocar os usuarios
        usuarios.add(new Usuario(idCounter.incrementAndGet(), "Daniel Albuquerque", "Av Brasil, 111", "daniel@upf.br", "549830923092"));
        usuarios.add(new Usuario(idCounter.incrementAndGet(), "Willian Calebe", "Av Brasil, 111", "willian@upf.br", "5498849384938"));
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
}
