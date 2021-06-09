package com.neservice.models;

public class CalendarItem {
	// Members
	private Bookings booking;
	private Service service;
	
	// Default Constructor
	public CalendarItem() {
		
	}
	
	// Override Constructor
	public CalendarItem(Bookings booking, Service service) {
		this.booking = booking;
		this.service = service;
	}

	// Getters
	public Bookings getBooking() {
		return booking;
	}

	public Service getService() {
		return service;
	}

	// Setters
	public void setBooking(Bookings booking) {
		this.booking = booking;
	}

	public void setService(Service service) {
		this.service = service;
	}
}
