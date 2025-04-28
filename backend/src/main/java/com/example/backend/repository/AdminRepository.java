package com.example.backend.repository;

import com.example.backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.server.CoWebFilterChain;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    CoWebFilterChain findByEmail(String email);
}
