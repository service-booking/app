package com.insert_name.jwt.resource;

@SuppressWarnings("serial")
public class AuthenticationException extends RuntimeException {
	public AuthenticationException(String message, Throwable cause) {
		super(message, cause);
	}
}

