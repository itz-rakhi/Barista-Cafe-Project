package com.baristacafe.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String phone;
    private String email;
    private String reservationDate;
    private String reservationTime;
    private Integer guests;
    private String notes;

    public Long getId() { return id; }
    public String getCustomerName() { return customerName; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getReservationDate() { return reservationDate; }
    public String getReservationTime() { return reservationTime; }
    public Integer getGuests() { return guests; }
    public String getNotes() { return notes; }

    public void setId(Long id) { this.id = id; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setEmail(String email) { this.email = email; }
    public void setReservationDate(String reservationDate) { this.reservationDate = reservationDate; }
    public void setReservationTime(String reservationTime) { this.reservationTime = reservationTime; }
    public void setGuests(Integer guests) { this.guests = guests; }
    public void setNotes(String notes) { this.notes = notes; }
}
