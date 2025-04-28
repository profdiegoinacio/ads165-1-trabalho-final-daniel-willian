package com.example.backend.service;

import com.example.backend.model.Admin;
import com.example.backend.model.Usuario;
import com.example.backend.repository.AdminRepository;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.security.TokenJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TokenJWT tokenJWT;

    public String autenticarLogin(String email, String senha) {

        Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
        if (usuario != null && usuario.getSenha().equals(senha)) {
            return tokenJWT.gerarToken(usuario.getEmail(), "usuario");  // Passando role "usuario"
        }


        Admin admin = adminRepository.findByEmail(email).orElse(null);
        if (admin != null && admin.getSenha().equals(senha)) {
            return tokenJWT.gerarToken(admin.getEmail(), "admin");  // Passando role "admin"
        }

        throw new RuntimeException("Credenciais inválidas!");
    }
}
