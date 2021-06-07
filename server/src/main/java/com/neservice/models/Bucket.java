package com.neservice.models;

public class Bucket {
	private String bucket = "neservice";
	private String defaultImg = "default.png";
			
	public Bucket(){
		
	}
	
	public String getBucket() {
		return bucket;
	}
	
	public String getPath(String ext) {
		return bucket + "/" + ext;
	}
	
	public String getDefaultPath() {
		return "https://" + bucket + ".s3-ap-southeast-2.amazonaws.com/" + defaultImg;
	}
	
	public String getFullPath(String ext) {
		return "https://" + bucket + ".s3-ap-southeast-2.amazonaws.com/" + ext + "/";
	}
}
