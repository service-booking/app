package com.neservice.models;

public class Day {
	// Members
	private String start;
	private String end;

	// Default Constructor
	public Day() {
		
	}
	
	// Override Constructor
	public Day(String start, String end) {
		this.start = start;
		this.end = end;
	}
	
	// Getters
	public String getStart() {
		return start;
	}

	public String getEnd() {
		return end;
	}

	// Setters
	public void setStart(String start) {
		this.start = start;
	}

	public void setEnd(String end) {
		this.end = end;
	}
}