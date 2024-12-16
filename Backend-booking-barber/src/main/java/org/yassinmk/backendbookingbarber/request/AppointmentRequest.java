package org.yassinmk.backendbookingbarber.request;


import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
@Data
public class AppointmentRequest {
    private String name;
    private String lastName;
    private String telephone;
    private LocalDate date;
    private LocalTime time;

    // Getters and setters
}
