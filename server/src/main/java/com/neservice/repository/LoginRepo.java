package com.neservice.repository;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import com.neservice.models.User;

@EnableScan
public interface LoginRepo extends CrudRepository<User, String> {
	User findByEmail(String email);
}
