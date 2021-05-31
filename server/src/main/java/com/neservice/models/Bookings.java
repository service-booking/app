package com.neservice.models;

public class Bookings {
	// Members of Table
	// @reserver is the email of the person looking to book
	// @id is the Service @id
	private String reserver;
	private String id;
	private String startTime;
	private String endTime;
	private String dayMonthYear;
	
	// Default Constructor
	public Bookings() {
		
	}
	
	// Override Constructor
	public Bookings(String reserver, String id, String startTime, String endTime, String dayMonthYear) {
		this.reserver = reserver;
		this.id = id;
		this.startTime = startTime;
		this.endTime = endTime;
		this.dayMonthYear = dayMonthYear;
	}

	// Getters
	public String getReserver() {
		return reserver;
	}

	public String getId() {
		return id;
	}

	public String getStartTime() {
		return startTime;
	}

	public String getEndTime() {
		return endTime;
	}
	
	public String getDayMonthYear() {
		return dayMonthYear;
	}
		
	// Setters
	public void setReserver(String reserver) {
		this.reserver = reserver;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
	public void setDayMonthYear(String dayMonthYear) {
		this.dayMonthYear = dayMonthYear;
	}
	
	// Comparison 
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        Bookings comp = (Bookings) o;
        return id.equals(comp.id);
    }
}