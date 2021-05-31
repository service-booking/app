package com.neservice.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.neservice.models.User;
import com.neservice.repository.LoginRepo;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

	@Autowired
	private LoginRepo repo;

	@Autowired
	private PasswordEncoder bCryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = repo.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", email));
		}

		return new JwtUserDetails(user.getEmail(), user.getPassword(), "ROLE_USER");
	}

	// Checks if the User Exists
	public boolean checkIfUserExists(String email) {
		User toCheck = repo.findByEmail(email);
		// Null Check
		if (toCheck == null) {
			return false;
		} else {
			return true;
		}
	}

	// Encrypt user password
	public User save(User user) {		
		user.setPassword(bCryptEncoder.encode(user.getPassword()));
		return repo.save(user);
	}
}


