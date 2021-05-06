package com.neservice;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NEServiceApplication {

	@PostConstruct
    public void init(){
        TimeZone.setDefault(TimeZone.getTimeZone("Australia/NSW"));   
    }
	
	public static void main(String[] args) {
		SpringApplication.run(NEServiceApplication.class, args);
	}
	
}