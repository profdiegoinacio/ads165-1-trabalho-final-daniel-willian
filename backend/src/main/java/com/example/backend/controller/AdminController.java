package com.example.backend.controller;

import com.example.backend.model.Admin;
import com.example.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public List<Admin> listarAdmins() {
        return adminService.listarAdmins();
    }

    @PostMapping
    public Admin cadastrarAdmin(@RequestBody Admin admin) {
        return adminService.registrarAdmin(admin);
    }

    @PutMapping("/{id}")
    public Admin atualizarAdmin(@PathVariable Long id, @RequestBody Admin adminAtualizado) {
        return adminService.atualizarAdmin(id, adminAtualizado);
    }

    @DeleteMapping("/{id}")
    public void deletarAdmin(@PathVariable Long id) {
        adminService.deletarAdmin(id);
    }
}
