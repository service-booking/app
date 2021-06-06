package com.neservice.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.neservice.GlobalVariable;
import com.neservice.models.User;
import com.neservice.models.UserBasic;
import com.neservice.repository.LoginRepo;

@CrossOrigin(origins=GlobalVariable.APP_URL)
@RestController
public class UserResource {
	@Autowired
	private LoginRepo repo;	

	@GetMapping("/jpa/{email}")
	public UserBasic getUser(@PathVariable String email){
		return new UserBasic(repo.findByEmail(email));
	}
	
	@GetMapping("/jpa/{email}/role")
	public String getUserRole(@PathVariable String email){
		return repo.findByEmail(email).getAccountType();
	}
	
	@PostMapping("/jpa/{email}")
	public ResponseEntity<Void> updateUser(@PathVariable String email, @RequestBody UserBasic user){
		// Used to Store Retrieved Data to Database
		User db = repo.findByEmail(email);
		
		// Update Each Paramater
		db.setFirstName(user.getFirstName());
		db.setLastName(user.getLastName());
		db.setAddress(user.getAddress());
		db.setMedia(user.getMedia());
		db.setAbout(user.getAbout());
		
		repo.save(db);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/jpa/{email}/{oldPassword}/update")
	public boolean updatePassword(
			@PathVariable String email, 
			@PathVariable String oldPassword,
			@RequestBody User user
		){
		boolean passwordCorrect = false;
		
		// Used to Store Retrieved Data to Database
		User db = repo.findByEmail(email);
		
		// Test and Save the Password
		BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();  		
		user.setPassword(bCrypt.encode(user.getPassword()));
		
		if(bCrypt.matches(oldPassword, db.getPassword())) {
			passwordCorrect = true;
			
			db.setPassword(user.getPassword());
			
			repo.save(db);
		}
		
		return passwordCorrect;
	}

}
