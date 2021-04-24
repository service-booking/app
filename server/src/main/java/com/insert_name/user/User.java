package com.insert_name.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
	// Members of Table
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String username;
	private String password;

	// Default Constructor
	public User() {
		
	}
	
	// Override Constructor
	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}
	
	// Getters
	public Long getID() {
		return id;
	}
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	
	// Setters
	public void setID(Long id) {
		this.id = id;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public void displayUser() {
		System.out.println("id: "+this.id);
		System.out.println("Username: "+this.username);
		System.out.println("Password: "+this.password);
	}
	
	// Comparison 
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        User comp = (User) o;
        return username.equals(comp.username);
    }
}
