package org.yassinmk.backendbookingbarber.service;

import org.springframework.stereotype.Service;
import org.yassinmk.backendbookingbarber.entities.Appointment;
import org.yassinmk.backendbookingbarber.entities.AppointmentStatus;
import org.yassinmk.backendbookingbarber.entities.Client;
import org.yassinmk.backendbookingbarber.repositories.AppointmentRepository;
import org.yassinmk.backendbookingbarber.repositories.ClientRepository;
import org.yassinmk.backendbookingbarber.request.AppointmentRequest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {


    private ClientRepository clientRepository;
    private AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, ClientRepository clientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.clientRepository = clientRepository;
    }

    public String bookAppointment(AppointmentRequest request) {
        if (appointmentRepository.existsByDateAndTime(request.getDate(), request.getTime())) {
            return "Time slot already booked";
        }

        Client client = clientRepository.save(new Client(null, request.getName(), request.getLastName(), request.getTelephone()));
        Appointment appointment = new Appointment(null, request.getDate(), request.getTime(), AppointmentStatus.PENDING, client);
        appointmentRepository.save(appointment);

        return "Appointment booked successfully";
    }

    public List<LocalTime> getAvailableTimes(LocalDate date) {
        // Define the range of working hours
        List<LocalTime> workingHours = new ArrayList<>();
        for (int hour = 9; hour <= 22; hour++) {
            workingHours.add(LocalTime.of(hour, 0));
        }

        // Fetch existing appointments for the given date
        List<Appointment> existingAppointments = appointmentRepository.findAllByDate(date);
        for (Appointment appointment : existingAppointments) {
            workingHours.remove(appointment.getTime());
        }

        return workingHours;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public String validateAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id).orElse(null);
        if (appointment == null) {
            return "Appointment not found";
        }

        appointment.setStatus(AppointmentStatus.CONFIRMED);
        appointmentRepository.save(appointment);
        return "Appointment validated";
    }

    public String cancelAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id).orElse(null);
        if (appointment == null) {
            return "Appointment not found";
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
        return "Appointment canceled";
    }

    public List<Appointment> getDashboardData() {
        return appointmentRepository.findAll();
    }
}
