package com.neservice.models;

public class WorkingHours {
	// Members
	private Day monday;
	private Day tuesday;
	private Day wednesday;
	private Day thursday;
	private Day friday;
	private Day saturday;
	private Day sunday;
	
	// Default Constructor
	public WorkingHours() {
		
	}
	
	// Override Constructor
	public WorkingHours(Day monday, Day tuesday, Day wednesday, Day thursday, Day friday, Day saturday, Day sunday) {
		this.monday = monday;
		this.tuesday = tuesday;
		this.wednesday = wednesday;
		this.thursday = thursday;
		this.friday = friday;
		this.saturday = saturday;
		this.sunday = sunday;
	}
	
	// Getters
	public Day getMonday() {
		return monday;
	}

	public Day getTuesday() {
		return tuesday;
	}

	public Day getWednesday() {
		return wednesday;
	}

	public Day getThursday() {
		return thursday;
	}

	public Day getFriday() {
		return friday;
	}

	public Day getSaturday() {
		return saturday;
	}

	public Day getSunday() {
		return sunday;
	}

	// Setters
    public void setMonday(Day monday) {
		this.monday = monday;
	}

	public void setTuesday(Day tuesday) {
		this.tuesday = tuesday;
	}

	public void setWednesday(Day wednesday) {
		this.wednesday = wednesday;
	}

	public void setThursday(Day thursday) {
		this.thursday = thursday;
	}

	public void setFriday(Day friday) {
		this.friday = friday;
	}

	public void setSaturday(Day saturday) {
		this.saturday = saturday;
	}

	public void setSunday(Day sunday) {
		this.sunday = sunday;
	}

	public void displayWorkingHours() {
		System.out.println("Monday: "+this.monday.getStart()+" to "+this.monday.getEnd());
		System.out.println("Tuesday: "+this.tuesday.getStart()+" to "+this.tuesday.getEnd());
		System.out.println("Wednesday: "+this.wednesday.getStart()+" to "+this.wednesday.getEnd());
		System.out.println("Thursday: "+this.thursday.getStart()+" to "+this.thursday.getEnd());
		System.out.println("Friday: "+this.friday.getStart()+" to "+this.friday.getEnd());
		System.out.println("Saturday: "+this.saturday.getStart()+" to "+this.saturday.getEnd());
		System.out.println("Sunday: "+this.sunday.getStart()+" to "+this.sunday.getEnd());
	}
}