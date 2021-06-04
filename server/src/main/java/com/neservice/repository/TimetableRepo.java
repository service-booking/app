package com.neservice.repository;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import com.neservice.models.TimetableDB;

@EnableScan
public interface TimetableRepo extends CrudRepository<TimetableDB, String> {
	TimetableDB findByEmail(String email);
}
