package com.neservice.models;

public class CalendarItem {
	// Members
	private Bookings booking;
	private Service service;
	private UserBasic reserver;
	
	// Default Constructor
	public CalendarItem() {
		
	}
	
	// Override Constructor
	public CalendarItem(Bookings booking, Service service, UserBasic reserver) {
		this.booking = booking;
		this.service = service;
		this.reserver = reserver;
	}

	// Getters
	public Bookings getBooking() {
		return booking;
	}

	public Service getService() {
		return service;
	}
	
	public UserBasic getReserver() {
		return reserver;
	}

	// Setters
	public void setBooking(Bookings booking) {
		this.booking = booking;
	}

	public void setService(Service service) {
		this.service = service;
	}
	
	public void setReserver(UserBasic user) {
		this.reserver = user;
	}
}
