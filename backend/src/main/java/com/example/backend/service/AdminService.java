package com.example.backend.service;

import com.example.backend.model.Admin;
import com.example.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Método para listar todos os admins
    public List<Admin> listarAdmins() {
        return adminRepository.findAll();
    }

    // Método para atualizar um admin existente
    public Admin atualizarAdmin(Long id, Admin adminAtualizado) {
        Admin admin = adminRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin não encontrado"));
        admin.setNome(adminAtualizado.getNome());
        admin.setEmail(adminAtualizado.getEmail());
        admin.setSenha(adminAtualizado.getSenha());
        return adminRepository.save(admin);
    }

    // Método para deletar um admin
    public void deletarAdmin(Long id) {
        Admin admin = adminRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin não encontrado"));
        adminRepository.delete(admin);
    }

    // Método para registrar um novo admin
    public Admin registrarAdmin(Admin admin) {
        // Verificar se o e-mail já está registrado
        if (adminRepository.existsByEmail(admin.getEmail())) {
            throw new RuntimeException("E-mail já cadastrado");
        }
        // Salvar o novo admin
        return adminRepository.save(admin);
    }
}
