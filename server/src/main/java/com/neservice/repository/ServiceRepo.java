package com.neservice.repository;

import java.util.List;
import java.util.Optional;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import com.neservice.models.Service;

@EnableScan
public interface ServiceRepo extends CrudRepository<Service, String> {
	Optional<Service> findById(String id);
	List<Service> findByStatus(boolean status);
	List<Service> findByEmail(String email);
	List<Service> findByTitleContaining(String title);
	List<Service> findByDescContaining(String desc);
}
