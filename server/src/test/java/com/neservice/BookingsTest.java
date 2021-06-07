package com.neservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.neservice.models.Bookings;

class BookingsTest {

	// Create Bookings 
	List<Bookings> bookings = new ArrayList<Bookings>(); 
	Bookings one = new Bookings();
	Bookings two = new Bookings();
	Bookings three = new Bookings();
	Bookings four = new Bookings();
	Bookings five = new Bookings();
	Bookings six = new Bookings();
	
	@BeforeEach
	void setup() {
		// Initialise
		one.setDayMonthYear("04/05/2021");
		one.setStartTime("08:50");
		
		two.setDayMonthYear("04/05/2021");
		two.setStartTime("08:51");
		
		three.setDayMonthYear("04/05/2020");
		three.setStartTime("08:50");
		
		four.setDayMonthYear("04/01/2021");
		four.setStartTime("08:50");
		
		five.setDayMonthYear("05/05/2021");
		five.setStartTime("08:50");
		
		six.setDayMonthYear("03/05/2021");
		six.setStartTime("08:50");
		
		// Add to List
		bookings.add(one);
		bookings.add(two);
		bookings.add(three);
		bookings.add(four);
		bookings.add(five);
		bookings.add(six);
	}
	
	@Test
	void trialSort() {
		Collections.sort(bookings);
		List<Bookings> expectedSorted = new ArrayList<Bookings>();
		expectedSorted.add(three);		
		expectedSorted.add(four);
		expectedSorted.add(six);
		expectedSorted.add(one);
		expectedSorted.add(two);
		expectedSorted.add(five);
		
		/*
		for(int i=0; i<bookings.size(); i++) {
			System.out.print("i: "+i+", ");
			bookings.get(i).displayBooking();
		}
		*/
				
		assertEquals(expectedSorted, bookings);
	}
	
	@Test
	void trialDayMonthYear() {
		assertEquals(4, one.retrieveDay());
		assertEquals(5, one.retrieveMonth());
		assertEquals(2021, one.retrieveYear());
		assertEquals(530, one.retrieveStart());
	}
	
	@Test
	void trialOverlap() {
		one.setEndTime("18:00");
		assertTrue(one.equals(two));
		two.setStartTime("18:01");
		assertFalse(one.equals(two));
	}
	
	@Test
	void trialConversion() {
		assertEquals("08:50", Bookings.iconvertToTime(530));
		assertEquals("18:50", Bookings.iconvertToTime(1130));
	}
}
