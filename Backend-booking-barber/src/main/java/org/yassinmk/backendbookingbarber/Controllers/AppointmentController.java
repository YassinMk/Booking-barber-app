package org.yassinmk.backendbookingbarber.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yassinmk.backendbookingbarber.entities.Appointment;
import org.yassinmk.backendbookingbarber.request.AppointmentRequest;
import org.yassinmk.backendbookingbarber.service.AppointmentService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private AppointmentService appointmentService;

    public AppointmentController (AppointmentService appointmentService){
        this.appointmentService = appointmentService;
    }


    @GetMapping("/available-times/{date}")
    public List<LocalTime> getAvailableTimes(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return appointmentService.getAvailableTimes(localDate);
    }

    @PostMapping("/book")
    public ResponseEntity<String> bookAppointment(@RequestBody AppointmentRequest request) {
        String response = appointmentService.bookAppointment(request);
        if (response.equals("Time slot already booked")) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/dashboard")
    public List<Appointment> getDashboardData() {
        return appointmentService.getDashboardData();
    }

    @PutMapping("/validate/{id}")
    public ResponseEntity<String> validateAppointment(@PathVariable Long id) {
        String response = appointmentService.validateAppointment(id);
        if (response.equals("Appointment not found")) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long id) {
        String response = appointmentService.cancelAppointment(id);
        if (response.equals("Appointment not found")) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }
}
