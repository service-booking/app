package com.neservice.models;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "login")
public class User {
	// Members of Table
	// Shared Members
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private String accountType;
	private String profilePicture;
	// Varying
	// Address will either be Postcode or Address
	private String address;
	private String media;
	private String about;

	// Default Constructor
	public User() {
		
	}
	
	// Override Constructor
	public User(String email, String password, String firstName, String lastName, String accountType, String profilePicture, String address, String media, String about) {
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.accountType = accountType;
		this.profilePicture = profilePicture;
		this.address = address;
		this.media = media;
		this.about = about;
	}
	
	// Getters
    @DynamoDBHashKey(attributeName="email")
	public String getEmail() {
		return email;
	}
    
    @DynamoDBAttribute
	public String getPassword() {
		return password;
	}
    
    @DynamoDBAttribute
	public String getFirstName() {
		return firstName;
	}

    @DynamoDBAttribute
	public String getLastName() {
		return lastName;
	}
    
    @DynamoDBAttribute
	public String getAccountType() {
		return accountType;
	}
    
    @DynamoDBAttribute
	public String getProfilePicture() {
		return profilePicture;
	}

    @DynamoDBAttribute
	public String getAddress() {
		return address;
	}

    @DynamoDBAttribute
	public String getMedia() {
		return media;
	}

    @DynamoDBAttribute
	public String getAbout() {
		return about;
	}

	// Setters
	public void setEmail(String email) {
		this.email = email;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	
	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setMedia(String media) {
		this.media = media;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public void displayUser() {
		System.out.println("Email: "+this.email);
		System.out.println("Password: "+this.password);
		System.out.println("First Name: "+this.firstName);
		System.out.println("Last Name: "+this.lastName);
		System.out.println("Account Type: "+this.accountType);
		System.out.println("Profile Picture URL: "+this.profilePicture);
		System.out.println("Address: "+this.address);
		System.out.println("Media Handler: "+this.media);
		System.out.println("About: "+this.about);
	}
	
	// Comparison 
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        User comp = (User) o;
        return email.equals(comp.email);
    }
}