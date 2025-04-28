package com.example.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;

@Component
public class TokenJWT {

    private Key chaveSecreta;
    private static final long EXPIRACAO_TOKEN_MS = 2 * 60 * 60 * 1000; // 2 horas

    @PostConstruct
    public void init() {
        this.chaveSecreta = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public String gerarToken(String email, String role) {
        Date agora = new Date();
        Date expiracao = new Date(agora.getTime() + EXPIRACAO_TOKEN_MS);

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)  // Adicionando o role no token
                .setIssuedAt(agora)
                .setExpiration(expiracao)
                .signWith(chaveSecreta)
                .compact();
    }
}
