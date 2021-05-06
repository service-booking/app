package com.neservice.repository;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import com.neservice.user.User;

@EnableScan
public interface LoginRepo extends CrudRepository<User, String> {
	User findByUsername(String username);
}
