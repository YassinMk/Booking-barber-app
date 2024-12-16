package org.yassinmk.backendbookingbarber.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.yassinmk.backendbookingbarber.entities.Admin;
import org.yassinmk.backendbookingbarber.repositories.AdminRepository;
import org.yassinmk.backendbookingbarber.request.LoginRequest;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


        private AdminRepository adminRepository;

        private BCryptPasswordEncoder passwordEncoder;

        public AuthController(AdminRepository adminRepository, BCryptPasswordEncoder passwordEncoder) {
            this.adminRepository = adminRepository;
            this.passwordEncoder = passwordEncoder;
        }

        @PostMapping("/login")
        public ResponseEntity<String> login(@RequestBody LoginRequest request) {
            Optional<Admin> adminOptional = adminRepository.findByUsername(request.getUsername());

            if (adminOptional.isPresent()) {
                Admin admin = adminOptional.get();
                if (passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
                    return ResponseEntity.ok("Login successful");
                }
            }

            return ResponseEntity.status(401).body("Invalid username or password");
        }

        @PostMapping("/logout")
        public ResponseEntity<String> logout() {
            SecurityContextHolder.clearContext();
            return ResponseEntity.ok("Logged out successfully");
        }
    }


