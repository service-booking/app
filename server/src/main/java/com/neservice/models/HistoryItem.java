package com.neservice.models;

import java.util.List;

public class HistoryItem {
	// Members
	private Service service;
	private List<Bookings> bookings;

	// Default Constructor
	public HistoryItem() {
		
	}
	
	// Override Constructor
	public HistoryItem(Service service) {
		this.service = service;
	}
	
	// Getters
	public Service getStart() {
		return service;
	}

	public List<Bookings> getBookings() {
		return bookings;
	}

	// Setters
	public void setService(Service service) {
		this.service = service;
	}

	// Array Functionality
	public void addBooking(Bookings newBooking) {
		bookings.add(newBooking);
	}
	
	public void removeBooking(Bookings booking) {
		bookings.remove(booking);
	}
}