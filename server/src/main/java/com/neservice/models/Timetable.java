package com.neservice.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Timetable {
	// Members of Table
	@JsonProperty("email") private String email;
	@JsonProperty("hours") private WorkingHours hours;
	@JsonProperty("bookings") private List<Bookings> bookings = new ArrayList<>();
	
	// Default Constructor
	public Timetable() {
		
	}
	
	// Override Constructor
	public Timetable(String email, WorkingHours hours, List<Bookings> bookings) {
		this.email = email;
		this.hours = hours;
		this.bookings = bookings;
	}
	
	// Getters
	public String getEmail() {
		return email;
	}
    
	public WorkingHours getHours() {
		return hours;
	}
    
	public List<Bookings> getBookings() {
		return bookings;
	}

	// Setters 
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setHours(WorkingHours hours) {
		this.hours = hours;
	}
	
	
	// Array Functionality
	public void addBooking(Bookings newBooking) {
		bookings.add(newBooking);
	}
	
	public void cancelBooking(Bookings oldBooking) {
		bookings.remove(oldBooking);
	}
	
	// Comparison 
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        Timetable comp = (Timetable) o;
        return email.equals(comp.email);
    }
}