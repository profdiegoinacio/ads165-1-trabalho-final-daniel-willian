package com.example.backend.service;

import com.example.backend.model.Admin;
import com.example.backend.model.Usuario;
import com.example.backend.repository.AdminRepository;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.security.TokenJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenJWT tokenJWT;

    public String login(String email, String senha) {

        Admin admin = adminRepository.findByEmail(email).filter(a -> a.getSenha().equals(senha)).orElse(null);
        if (admin != null) {
            return tokenJWT.gerarToken(admin.getEmail(), "admin");
        }


        Usuario usuario = usuarioRepository.findByEmail(email).filter(u -> u.getSenha().equals(senha)).orElse(null);
        if (usuario != null) {
            return tokenJWT.gerarToken(usuario.getEmail(), "usuario");
        }

        throw new RuntimeException("Email ou senha inválidos");
    }
}
