package com.neservice.resources;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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
import com.neservice.models.Bookings;
import com.neservice.models.Day;
import com.neservice.models.Service;
import com.neservice.models.Timetable;
import com.neservice.models.TimetableDB;
import com.neservice.models.WorkingHours;
import com.neservice.repository.ServiceRepo;
import com.neservice.repository.TimetableRepo;

@CrossOrigin(origins=GlobalVariable.APP_URL)
@RestController
public class TimetableResource {
	@Autowired
	private TimetableRepo trepo;
	@Autowired
	private ServiceRepo srepo;
	
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
	@GetMapping("/jpa/{email}/get/bookings/provider")
	public List<Bookings> getAllBookingsProvider(@PathVariable String email){
		// Used to Store Retrieved Data to Database
		Timetable ttable = new Timetable(trepo.findByEmail(email));
		
		return ttable.getBookings();
	}
	
	// Get the Bookings for the Provider
	@GetMapping("/jpa/{email}/get/bookings/reserver")
	public List<Bookings> getAllBookingsReserver(@PathVariable String email){
		// Apply O(n^2) Search through Timetable table
		List<TimetableDB> db = new ArrayList<TimetableDB>(trepo.findAll());
		List<Bookings> bookings = new ArrayList<Bookings>();

		// Linear Search the Table Records
		for(int i=0; i<db.size(); i++) {
			System.out.println(db.get(i).getBookings());
			// Convert to Usable Objcet
			Timetable ttable = new Timetable(db.get(i));
			List<Bookings> tbookings = ttable.getBookings();
			// Linear Search the Booking Records
			for(int j=0; j<tbookings.size(); j++) {
				// Check if the Reservers match
				if(tbookings.get(j).getReserver().equals(email)) {
					bookings.add(tbookings.get(j));
				}
			}
		}
		
		return bookings;
	}
	
	// Get the Bookings for the Service
	@GetMapping("/jpa/{email}/get/bookings/{id}")
	public List<Bookings> getBookingsForService(@PathVariable String email, @PathVariable String id){
		List<Bookings> bookings = new ArrayList<Bookings>();
		
		// Find the Service Provider
		String provider = srepo.findById(id).get().getEmail();
		
		// Used to Store Retrieved Data to Database
		Timetable ttable = new Timetable(trepo.findByEmail(provider));
		
		// Search for Service Bookings
		for(int i=0; i<ttable.getBookings().size(); i++) {
			// if the Service ID's match
			if(ttable.getBookings().get(i).getId().equals(id)) {
				bookings.add(ttable.getBookings().get(i));
			}
		}
		
		return bookings;
	}
	
	// Create a Booking
	@PostMapping("/jpa/{email}/create/booking/{id}")
	public boolean createBooking(
			@PathVariable String email, 
			@PathVariable String id,
			@RequestBody Bookings booking
		){
		
		boolean success = true;
		
		// Find the Service Provider
		Service service = srepo.findById(id).get();
		String provider = service.getEmail();
		String price = service.getPrice();
		
		// Used to Store Retrieved Data to Database
		Timetable ttable = new Timetable(trepo.findByEmail(provider));

		// Update Booking Details
		booking.setReserver(email);
		booking.setId(id);
		booking.setPrice(price);
		
		// Check if the overlapped bookings
		for(int i=0; i<ttable.getBookings().size(); i++) {
			//if(booking.equals(ttable.getBookings().get(i))) {
			if(ttable.getBookings().get(i).equals(booking)) {
				success = false;
				break;
			}
		}
		
		// if no Overlapping Booking,
		if(success) {
			// Add Booking to Timetable
			ttable.addBooking(booking);
			
			// Update Timetable
			trepo.save(new TimetableDB(ttable));
		}
		
		return success;
	}
	
	// Canceling a Booking
	@PostMapping("/jpa/{email}/cancel/booking/{id}")
	public ResponseEntity<Void> cancelBooking(
			@PathVariable String email, 
			@PathVariable String id, 
			@RequestBody Bookings booking
		) {
		booking.displayBooking();
		// Find the Service Provider
		String provider = srepo.findById(id).get().getEmail();
		
		// Used to Store Retrieved Data to Database
		Timetable ttable = new Timetable(trepo.findByEmail(provider));
				
		// Cancel the Booking
		ttable.cancelBooking(booking);
		
		// Update Timetable
		trepo.save(new TimetableDB(ttable));
		
		return ResponseEntity.noContent().build();
	}
	
	// Retrieving all Available Bookings for a Particular Day
	@PostMapping("/jpa/{email}/get/available/bookings/{id}")
	public List<Bookings> getAllAvailableBookings(
			@PathVariable String email, 
			@PathVariable String id, 
			@RequestBody String date
		){
		date = date.replace("%2F", "/").replace("=", "");
		System.out.println(date);
		List<Bookings> bookings = new ArrayList<Bookings>();
		
		// Find the Service Provider and Duration
		Service service = srepo.findById(id).get();
		String provider = service.getEmail();
		int duration = service.getDuration();
		
		// Used to Store Retrieved Data to Database
		Timetable ttable = new Timetable(trepo.findByEmail(provider)); 
		List<Bookings> allBookings = new ArrayList<Bookings>();
		Bookings dayBooking = new Bookings();
		dayBooking.setDayMonthYear(date);
		dayBooking.setStartTime("00:00");
		dayBooking.setEndTime("24:00");
		
		// Get the Right Working Hours
		Day hours = ttable.getHours().retrieveDay(Bookings.convertToDay(date));
		
		// Extract the Integer Start and End Times
		int start = Bookings.sconvertToTime(hours.getStart());
		int end = Bookings.sconvertToTime(hours.getEnd());
		int bstart = start; 
		
		// Get all Bookings for that Particular Day
		for(int i=0; i<ttable.getBookings().size(); i++) {
			if(dayBooking.equals(ttable.getBookings().get(i))) {
				allBookings.add(ttable.getBookings().get(i));
			}
		}
		
		for(int i=0; i<allBookings.size(); i++) {
			allBookings.get(i).displayBooking();
		}
		
		// Create Available Bookings using @start, @end, @duration, and allBookings
		while(bstart < end) {
			boolean checkFailed = false;
			// Create the Available Booking
			Bookings timeslot = new Bookings();
			timeslot.setStartTime(Bookings.iconvertToTime(bstart));
			timeslot.setEndTime(Bookings.iconvertToTime(bstart+duration));
			timeslot.setDayMonthYear(date);
			
			// Check Bookings
			for(int i=0; i<allBookings.size(); i++) {
				if(timeslot.equals(allBookings.get(i))) {
					checkFailed = true;
					break;
				}
			}
			
			// If the Booking is Available, Add it to List
			if(!checkFailed) {
				bookings.add(timeslot);
			}
			
			// Update bstart
			bstart += duration;
		}
		
		for(int i=0; i<bookings.size(); i++) {
			bookings.get(i).displayBooking();
		}
		
		return bookings;
	}
}
