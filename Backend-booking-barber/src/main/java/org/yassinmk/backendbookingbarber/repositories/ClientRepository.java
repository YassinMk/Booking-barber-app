package org.yassinmk.backendbookingbarber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.yassinmk.backendbookingbarber.entities.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {}

