package com.example.backend.controller;

import com.example.backend.model.Login;
import com.example.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login login) {
        String email = login.getEmail();
        String senha = login.getSenha();

        String token = authService.login(email, senha);
        return ResponseEntity.ok().body(token);
    }

    @GetMapping("/protegido")
    public ResponseEntity<String> protegido() {
        return ResponseEntity.ok("Acesso autorizado com token válido!");
    }
}
