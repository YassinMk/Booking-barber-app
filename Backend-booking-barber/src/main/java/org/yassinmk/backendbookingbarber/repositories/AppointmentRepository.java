package org.yassinmk.backendbookingbarber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.yassinmk.backendbookingbarber.entities.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    boolean existsByDateAndTime(LocalDate date, LocalTime time);

    List<Appointment> findAllByDate(LocalDate date);
}
