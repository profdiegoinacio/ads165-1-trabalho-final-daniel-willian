package com.example.backend.controller;

import com.example.backend.Admin;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/admins")
@CrossOrigin(origins = "*")
public class AdminController {

    private List<Admin> admins = new ArrayList<>();
    private AtomicLong idCounter = new AtomicLong();

    public AdminController() {
        admins.add(new Admin(idCounter.incrementAndGet(), "Daniel Albuquerque", "daniel@upf.br", "admin123"));
        admins.add(new Admin(idCounter.incrementAndGet(), "Willian Calebe", "willian@upf.br", "admin456"));
    }

    @GetMapping
    public List<Admin> listarAdmins() {
        return admins;
    }

    @PostMapping
    public Admin cadastrarAdmin(@RequestBody Admin admin) {
        admin.setId(idCounter.incrementAndGet());
        admins.add(admin);
        return admin;
    }

    @PutMapping("/{id}")
    public Admin atualizarAdmin(@PathVariable Long id, @RequestBody Admin adminAtualizado) {
        Optional<Admin> adminExistente = admins.stream()
                .filter(a -> a.getId().equals(id))
                .findFirst();

        if (adminExistente.isPresent()) {
            Admin admin = adminExistente.get();
            admin.setNome(adminAtualizado.getNome());
            admin.setEmail(adminAtualizado.getEmail());
            admin.setSenha(adminAtualizado.getSenha()); // Atualiza senha também
            return admin;
        } else {
            throw new RuntimeException("Admin não encontrado com ID: " + id);
        }
    }

    @DeleteMapping("/{id}")
    public void deletarAdmin(@PathVariable Long id) {
        boolean removido = admins.removeIf(admin -> admin.getId().equals(id));
        if (!removido) {
            throw new RuntimeException("Admin não encontrado para exclusão com ID: " + id);
        }
    }
}
