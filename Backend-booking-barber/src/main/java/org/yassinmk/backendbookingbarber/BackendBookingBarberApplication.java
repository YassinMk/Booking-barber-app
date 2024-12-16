package org.yassinmk.backendbookingbarber;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.yassinmk.backendbookingbarber.entities.Admin;
import org.yassinmk.backendbookingbarber.repositories.AdminRepository;

@SpringBootApplication
@RequiredArgsConstructor
@CrossOrigin("*")
public class BackendBookingBarberApplication {
    private final AdminRepository adminRepository;

    public static void main(String[] args) {
        SpringApplication.run(BackendBookingBarberApplication.class, args);
    }
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @PostConstruct
    public void init() {
        if (adminRepository.count() == 0) {
            Admin admin = new Admin();
            admin.setUsername("admin");
            admin.setRole("ROLE_ADMIN");
            admin.setPassword(passwordEncoder().encode("admin123"));
            adminRepository.save(admin);
        }
    }

}
