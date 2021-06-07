package com.neservice.models;

public class UserBasic {
	// Members of Table
	// Shared Members
	private String email;
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
	public UserBasic() {
		
	}
	
	// Override Constructor
	public UserBasic(String email, String firstName, String lastName, String accountType, String profilePicture, String address, String media, String about) {
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.accountType = accountType;
		this.profilePicture = profilePicture;
		this.address = address;
		this.media = media;
		this.about = about;
	}
	
	// Override Constructor
	public UserBasic(User user) {
		this.email = user.getEmail();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.accountType = user.getAccountType();
		this.profilePicture = user.getProfilePicture();
		this.address = user.getAddress();
		this.media = user.getMedia();
		this.about = user.getAbout();
	}
	
	// Getters
	public String getEmail() {
		return email;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}
    
	public String getAccountType() {
		return accountType;
	}
	
	public String getProfilePicture() {
		return profilePicture;
	}

	public String getAddress() {
		return address;
	}

	public String getMedia() {
		return media;
	}

	public String getAbout() {
		return about;
	}

	// Setters
	public void setEmail(String email) {
		this.email = email;
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
        
        UserBasic comp = (UserBasic) o;
        return email.equals(comp.email);
    }
}