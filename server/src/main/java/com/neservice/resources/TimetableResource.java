package com.neservice.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.neservice.GlobalVariable;
import com.neservice.models.TimetableDB;
import com.neservice.models.WorkingHours;
import com.neservice.repository.LoginRepo;
import com.neservice.repository.ServiceRepo;
import com.neservice.repository.TimetableRepo;

@CrossOrigin(origins=GlobalVariable.APP_URL)
@RestController
public class TimetableResource {
	@Autowired
	private TimetableRepo trepo;
	@Autowired
	private ServiceRepo srepo;
	@Autowired
	private LoginRepo lrepo;
	
	// Used to Read a JSON Document and Convert to Object
	private ObjectMapper jmap = new ObjectMapper();
	
	// Get the Working Hours
	@GetMapping("/jpa/{email}/get/workingHours")
	public WorkingHours getWorkingHours(@PathVariable String email){
		// Used to Store Retrieved Data to Database
		TimetableDB db = null;
		WorkingHours hours = null;

		try {
			// Get DynamoDB Object
			db = trepo.findByEmail(email);
			
			// Extract the Working Hours
			hours = jmap.readValue(db.getHours(), WorkingHours.class);
			
		} catch (JsonMappingException e) {
			System.out.println("System - Error Updating Database");
		}
		catch (JsonProcessingException e) {
			System.out.println("System - Error Updating Database");
		}
		
		return hours;
	}
	
	// Create the Working Hours
	@PostMapping("/jpa/{email}/set/workingHours")
	public ResponseEntity<Void> setupWorkingHours(
			@PathVariable String email, 
			@RequestBody WorkingHours hours
		){
		// Stores all the Bookings for the Service Provider (Left Untouched)
		String bookings = "[]";
				
		// Used to Store Retrieved Data to Database
		TimetableDB db = null;
		
		try {
			// Get DynamoDB Object
			db = trepo.findByEmail(email);
			
			// if it doesn't exist, then new user
			if (db != null) {
				// Get the Current String (Left Untouched)
				bookings = db.getBookings();
			}
			
			// Save it
			trepo.save(new TimetableDB(email, jmap.writeValueAsString(hours), bookings));
			
		} catch (JsonMappingException e) {
			System.out.println("System - Error Updating Database");
		}
		catch (JsonProcessingException e) {
			System.out.println("System - Error Updating Database");
		}
		
		return ResponseEntity.noContent().build();
	}
	
	
	
}
