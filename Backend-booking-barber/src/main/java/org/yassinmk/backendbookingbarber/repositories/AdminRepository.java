package org.yassinmk.backendbookingbarber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.yassinmk.backendbookingbarber.entities.Admin;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin,Long> {
    Optional<Admin> findByUsername(String username);
}
