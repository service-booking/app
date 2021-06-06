package com.neservice.repository;

import java.util.List;
import java.util.Optional;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import com.neservice.models.Service;

@EnableScan
public interface ServiceRepo extends CrudRepository<Service, String> {
	Optional<Service> findById(String id);
	List<Service> findByEmail(String email);
	List<Service> findByTitleContainingIgnoreCase(String title);
	List<Service> findByDescContainingIgnoreCase(String desc);
	List<Service> findByTitleAndDescContainingIgnoreCase(String title, String desc);
}
