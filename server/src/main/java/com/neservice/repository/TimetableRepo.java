package com.neservice.repository;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import com.neservice.models.Timetable;

@EnableScan
public interface TimetableRepo extends CrudRepository<Timetable, String> {
	Timetable findByEmail(String email);
}
