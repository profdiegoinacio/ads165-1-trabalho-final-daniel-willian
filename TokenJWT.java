package com.example.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class TokenJWT {

    private Key chaveSecreta;
    private static final long EXPIRACAO_TOKEN_MS = 2 * 60 * 60 * 1000; // 2 horas

    // Sua chave secreta fixa (deve ter pelo menos 256 bits = 32 caracteres)
    private static final String CHAVE_SECRETA_STRING = "MinhaChaveSuperSecretaParaJWT123456!";

    @PostConstruct
    public void init() {
        this.chaveSecreta = Keys.hmacShaKeyFor(CHAVE_SECRETA_STRING.getBytes(StandardCharsets.UTF_8));
    }

    public String gerarToken(String email, String role) {
        Date agora = new Date();
        Date expiracao = new Date(agora.getTime() + EXPIRACAO_TOKEN_MS);

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)  // Adicionando o role no token
                .setIssuedAt(agora)
                .setExpiration(expiracao)
                .signWith(chaveSecreta, SignatureAlgorithm.HS256)
                .compact();
    }

    // Método para validar o token (você pode criar aqui também)
    public boolean validarToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(chaveSecreta)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Método para extrair email (subject) do token
    public String getEmailDoToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(chaveSecreta)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
