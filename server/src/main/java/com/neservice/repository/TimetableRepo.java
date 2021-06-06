package com.neservice.repository;

import java.util.List;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import com.neservice.models.TimetableDB;

@EnableScan
public interface TimetableRepo extends CrudRepository<TimetableDB, String> {
	TimetableDB findByEmail(String email);
	List<TimetableDB> findAll();
}