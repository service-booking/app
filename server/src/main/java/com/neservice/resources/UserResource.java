package com.neservice.resources;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ListObjectsRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.neservice.GlobalVariable;
import com.neservice.config.AmazonS3Config;
import com.neservice.models.Bucket;
import com.neservice.models.User;
import com.neservice.models.UserBasic;
import com.neservice.repository.LoginRepo;

@CrossOrigin(origins=GlobalVariable.APP_URL)
@RestController
public class UserResource {
	@Autowired
	private LoginRepo repo;	
	@Autowired
	private PasswordEncoder bCrypt;
	@Autowired
    private AmazonS3Config conf;
	
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
		user.setPassword(bCrypt.encode(user.getPassword()));
		
		if(bCrypt.matches(oldPassword, db.getPassword())) {
			passwordCorrect = true;
			
			db.setPassword(user.getPassword());
			
			repo.save(db);
		}
		
		return passwordCorrect;
	}
	
	@SuppressWarnings("rawtypes")
	@PostMapping("/jpa/{email}/profile/picture/upload")
    public ResponseEntity uploadUserProfile(@PathVariable String email, @RequestParam("file") MultipartFile file) {
		// Used to Store Retrieved Data to Database
		User db = repo.findByEmail(email);
		Bucket bucket = new Bucket();
		
		
		// Code sourced from: https://github.com/amigoscode/spring-s3-react-file-upload
		
		// Initialising the S3 Client
		AmazonS3 s3 = conf.s3(conf.awsCredentials());
		
		// Extract any Metadata from the Uploaded File 
		ObjectMetadata metadata = extractMetadata(file);
        
        // Create Path (AWS) and Filename for Uploaded File
		String ext = email.replace("@", "-").replace(".", "-");
        String path = bucket.getPath(ext);
        String filename = file.getOriginalFilename();
        
    	System.out.println(ext);
    	System.out.println(path);
    	System.out.println(bucket.getFullPath(ext)+filename);
    	System.out.println(filename);
    	
    	// Check if there is a User Profile Picture Already
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest()
                .withBucketName(bucket.getBucket())
                .withPrefix(ext);

        ObjectListing objectListing = s3.listObjects(listObjectsRequest);

        while (true) {
            for (S3ObjectSummary objectSummary : objectListing.getObjectSummaries()) {
                s3.deleteObject(bucket.getBucket(), objectSummary.getKey());
            }
            if (objectListing.isTruncated()) {
                objectListing = s3.listNextBatchOfObjects(objectListing);
            } else {
                break;
            }
        }
    	
        // Attempt to Push to S3
        try {
        	s3.putObject(path, filename, file.getInputStream(), metadata);
            // Set the User's Profile Picture Path to S3 Bucket
            db.setProfilePicture((new Bucket()).getFullPath(ext)+filename);
            
            // Update User Account Details
    		repo.save(db);
    		
		} catch (IOException e) {
			System.out.println("System - Error uploading file to Amazon S3");
		}
        
        //everything was OK, return HTTP OK status (200) to the client
        return ResponseEntity.ok().build();
    }
	
	// Code sourced from: https://github.com/amigoscode/spring-s3-react-file-upload
	private ObjectMetadata extractMetadata(MultipartFile file) {
        Map<String, String> meta = new HashMap<>();
        
        ObjectMetadata metadata = new ObjectMetadata();
        Optional.of(meta).ifPresent(map -> {
            if (!map.isEmpty()) {
                map.forEach(metadata::addUserMetadata);
            }
        });
        
        meta.put("Content-Type", file.getContentType());
        meta.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }
	
	@GetMapping("/jpa/default")
	public String getDefaultProfilePicture(){
		return (new Bucket()).getDefaultPath();
	}

}
