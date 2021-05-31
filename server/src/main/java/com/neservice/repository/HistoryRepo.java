package com.neservice.repository;

import java.util.List;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import com.neservice.models.History;

@EnableScan
public interface HistoryRepo extends CrudRepository<History, String> {
	List<HistoryRepo> findByProvider(String provider);
	List<HistoryRepo> findByReserver(String reserver);
}
