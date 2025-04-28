package com.example.backend.service;

import com.example.backend.model.Admin;
import com.example.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;


    public List<Admin> listarAdmins() {
        return adminRepository.findAll();  // Recupera todos os admins do banco de dados
    }


    public Admin registrarAdmin(Admin admin) {
        if (adminRepository.existsByEmail(admin.getEmail())) {
            throw new RuntimeException("Este e-mail já está cadastrado.");
        }
        return adminRepository.save(admin);  // Salva o novo admin no banco de dados
    }


    public Admin atualizarAdmin(Long id, Admin adminAtualizado) {
        Admin admin = adminRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin não encontrado"));
        admin.setNome(adminAtualizado.getNome());
        admin.setEmail(adminAtualizado.getEmail());
        admin.setSenha(adminAtualizado.getSenha());  // Atualiza a senha
        return adminRepository.save(admin);  // Salva as alterações no banco de dados
    }


    public void deletarAdmin(Long id) {
        Admin admin = adminRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin não encontrado"));
        adminRepository.delete(admin);  // Exclui o admin do banco de dados
    }
}
