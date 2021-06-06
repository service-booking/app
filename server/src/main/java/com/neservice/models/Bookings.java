package com.neservice.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class Bookings implements Comparable<Bookings> {
	// Members of Table
	// @reserver is the email of the person looking to book
	// @id is the Service @id
	private String reserver;
	private String id;
	private String price;
	private String startTime;
	private String endTime;
	private String dayMonthYear;
	
	// Default Constructor
	public Bookings() {
		
	}
	
	// Override Constructor
	public Bookings(String reserver, String id, String price, String startTime, String endTime, String dayMonthYear) {
		this.reserver = reserver;
		this.id = id;
		this.price = price;
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
	
	public String getPrice() {
		return price;
	}
	
	public int retrieveStart() {
		return Bookings.sconvertToTime(startTime);

	}
	
	public String getStartTime() {
		return startTime;
	}

	public int retrieveEnd() {
		return Bookings.sconvertToTime(endTime);
	}
	
	public String getEndTime() {
		return endTime;
	}
	
	public int retrieveDay() {
		String[] date = dayMonthYear.split("/");
		return Integer.parseInt(date[0]);
	}
	
	public int retrieveMonth() {
		String[] date = dayMonthYear.split("/");
		return Integer.parseInt(date[1]);
	}
	
	public int retrieveYear() {
		String[] date = dayMonthYear.split("/");
		return Integer.parseInt(date[2]);
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
	
	public void setPrice(String price) {
		this.price = price;
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
	
	// Converts a String time to int time
	public static int sconvertToTime(String time) {
		String[] t = time.split(":");
		return (Integer.parseInt(t[0])*60)+(Integer.parseInt(t[1]));
	}
	
	// Converts an int time to String time
	public static String iconvertToTime(int time) {
		int hours = (int) (time/60);
		int mins = time - hours*60;
		
		return String.format("%02d:%02d", (int) (time/60), mins);
	}
	
	// Gets the Day of the Week (e.g., monday)
	public static String convertToDay(String date) {
		String day = null;
		try {
			day = (new SimpleDateFormat("EEEE")).format((new SimpleDateFormat("dd/MM/yyyy")).parse(date));
		} catch(ParseException e) {
			System.out.println("System - Error Parsing Date to Day");
		}
		
		return day.toLowerCase();
	}
	
	public void displayBooking() {
		System.out.print("Reserver: "+this.reserver);
		System.out.print(", Service ID: "+this.id);
		System.out.print(", Service Price: "+this.price);
		System.out.print(", Start Time: "+this.startTime);
		System.out.print(", End Time: "+this.endTime);
		System.out.println(", Date: "+this.dayMonthYear);
	}
	
	// Comparison 
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        Bookings comp = (Bookings) o;
        
        // Date Overlapping Tests
        int y = this.retrieveYear() - comp.retrieveYear();
        int m = this.retrieveMonth() - comp.retrieveMonth();
        int d = this.retrieveDay() - comp.retrieveDay();
        
        // Timeslot Overlapping Tests
        int s = this.retrieveStart();
        int e = this.retrieveEnd();
        
        int scomp = comp.retrieveStart();
        int ecomp = comp.retrieveEnd();
                
        boolean testDayMonthYear = (y == 0) && (m == 0) && (d == 0);
        
        // Four Cases for Overlap (1) (2) are the 1st and 2nd timeslots
        // if (1)'s start is within (2)
        // if (2)'s start is within (1)
        // if (2) is within (1)
        // if (1) is within (2)
        boolean a = (s >= scomp) && (s < ecomp);
        boolean b = (e > scomp) && (e <= ecomp);
        boolean c = (s < scomp) && (e > ecomp);
        
        return testDayMonthYear && (a || b || c);
    }
	
	// Comparison 
	@Override
	public int compareTo(Bookings comp) {
		// Compare the Years
		if(this.retrieveYear() == comp.retrieveYear()) {
			// Compare the Months
			if(this.retrieveMonth() == comp.retrieveMonth()) {
				// Compare the Day
				if(this.retrieveDay() == comp.retrieveDay()) {
					// Compare the Start Time
					return this.retrieveStart() - comp.retrieveStart();
				} else {
					return this.retrieveDay() - comp.retrieveDay();
				}
			} else {
				return this.retrieveMonth() - comp.retrieveMonth();
			}
		} else {
			return this.retrieveYear() - comp.retrieveYear();
		}
	}
}
