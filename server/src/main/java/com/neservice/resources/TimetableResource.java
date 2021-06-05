package com.neservice.resources;

import java.util.Optional;

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
import com.neservice.models.Service;
import com.neservice.models.Timetable;
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
	
	// --------------------------------------------------------------------- //
	// Working Hours Related Functionality
	// --------------------------------------------------------------------- //
	
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
			System.out.println("System - Error Reading from Database");
		}
		catch (JsonProcessingException e) {
			System.out.println("System - Error Reading from Database");
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
	
	// --------------------------------------------------------------------- //
	// Booking Functionality
	// --------------------------------------------------------------------- //
	
	// Get the Bookings for the Provider
	@GetMapping("/jpa/{email}/get/bookings")
	public Timetable getAllBookings(@PathVariable String email){
		return new Timetable(trepo.findByEmail(email));
	}
	
	// Get the Bookings for the Service
	@GetMapping("/jpa/{email}/get/bookings/{id}")
	public Timetable getBookingsForService(@PathVariable String email, @PathVariable String id){
		// Used to Store Retrieved Data to Database
		TimetableDB tdb = null;
		Service sdb = null;
		Timetable ttable = null;
		
		// Find the Service Provider
		sdb = srepo.findById(id).get();
		
		return ttable;
	}
}
