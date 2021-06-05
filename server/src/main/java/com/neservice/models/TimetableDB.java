package com.neservice.models;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@DynamoDBTable(tableName = "timetable")
public class TimetableDB {
	// Members of Table
	@JsonProperty("email") private String email;
	@JsonProperty("hours") private String hours;
	@JsonProperty("bookings") private String bookings;
	
	// Used to Read a JSON Document and Convert to Object
	private ObjectMapper jmap = new ObjectMapper();
	
	// Default Constructor
	public TimetableDB() {
		
	}
	
	// Override Constructor
	public TimetableDB(String email, String hours, String bookings) {
		this.email = email;
		this.hours = hours;
		this.bookings = bookings;
	}
	
	// Override Constructor
	public TimetableDB(Timetable ttable) {
		this.email = ttable.getEmail();
		try {
			this.hours = jmap.writeValueAsString(ttable.getHours());
			this.bookings = jmap.writeValueAsString(ttable.getBookings());;
		} catch (JsonMappingException e) {
			System.out.println("System - Error Writing to Database");
		} catch (JsonProcessingException e) {
			System.out.println("System - Error Writing to Database");
		}
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