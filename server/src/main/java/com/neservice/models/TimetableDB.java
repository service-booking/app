package com.neservice.models;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.fasterxml.jackson.annotation.JsonProperty;

@DynamoDBTable(tableName = "timetable")
public class TimetableDB {
	// Members of Table
	@JsonProperty("email") private String email;
	@JsonProperty("hours") private String hours;
	@JsonProperty("bookings") private String bookings;
	
	// Default Constructor
	public TimetableDB() {
		
	}
	
	// Override Constructor
	public TimetableDB(String email, String hours, String bookings) {
		this.email = email;
		this.hours = hours;
		this.bookings = bookings;
	}
	
	// Getters
    @DynamoDBHashKey(attributeName="email")
	public String getEmail() {
		return email;
	}
    
    @DynamoDBAttribute
	public String getHours() {
		return hours;
	}
    
    @DynamoDBAttribute
	public String getBookings() {
		return bookings;
	}

	// Setters 
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setHours(String hours) {
		this.hours = hours;
	}
	
	public void setBookings(String bookings) {
		this.bookings = bookings;
	}
}