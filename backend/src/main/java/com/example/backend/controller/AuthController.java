package com.example.backend.controller;

import com.example.backend.Admin;
import com.example.backend.Usuario;
import com.example.backend.dto.LoginRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final List<Admin> admins;
    private final List<Usuario> usuarios;

    public AuthController() {
        admins = List.of(
                new Admin(1L, "Admin", "admin@upf.br", "admin123"),
                new Admin(2L, "Outro Admin", "outro@upf.br", "admin456")
        );

        usuarios = List.of(
                new Usuario(1L, "Daniel Albuquerque", "Av Brasil", "daniel@upf.br", "549830923092", "usuario123"),
                new Usuario(2L, "Willian Calebe", "Av Central", "willian@upf.br", "5498849384938", "usuario456")
        );
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String senha = loginRequest.getSenha();

        // Verifica se é um admin
        if (admins.stream().anyMatch(a -> a.getEmail().equalsIgnoreCase(email) && a.getSenha().equals(senha))) {
            return "admin";
        }

        // Verifica se é um usuário
        if (usuarios.stream().anyMatch(u -> u.getEmail().equalsIgnoreCase(email) && u.getSenha().equals(senha))) {
            return "usuario";
        }

        throw new RuntimeException("Email ou senha inválidos");
    }
}
