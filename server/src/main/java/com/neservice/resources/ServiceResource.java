package com.neservice.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.neservice.GlobalVariable;
import com.neservice.models.Service;
import com.neservice.repository.ServiceRepo;

@CrossOrigin(origins=GlobalVariable.APP_URL)
@RestController
public class ServiceResource {
	@Autowired
	private ServiceRepo repo;	
	
	@GetMapping("/jpa/{email}/get/service/{id}")
	public Service getService(@PathVariable String email, @PathVariable String id){
		return repo.findById(id).get();
	}
	
	@GetMapping("/jpa/{email}/get/services")
	public List<Service> getAllServices(@PathVariable String email){
		List<Service> services = new ArrayList<Service>(repo.findByEmail(email));
		
		// Remove any of the Disabled Services
		for(int i=0; i<services.size(); i++) {
			if(services.get(i).getStatus() == false) {
				services.remove(i);
			}
		}
		
		return services;
	}
	
	@GetMapping("/jpa/get/services")
	public List<Service> getAllActiveServices(){
		return repo.findByStatus(true);
	}
	
	@PostMapping("/jpa/{email}/create/service")
	public ResponseEntity<Void> createService(@PathVariable String email, @RequestBody Service service){
		// Add the Provider to the Service
		service.setEmail(email);
		
		repo.save(service);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/jpa/{email}/disable/service/{id}")
	public ResponseEntity<Void> disableService(@PathVariable String email, @PathVariable String id) {
		Service service = repo.findById(id).get();
		service.setStatus(false);
		
		repo.save(service);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/jpa/{email}/update/service/{id}")
	public ResponseEntity<Void> updateService (
			@PathVariable String email,
			@PathVariable String id,
			@RequestBody Service service			
		){
		Service updatedService = repo.findById(id).get();
		updatedService.setTitle(service.getTitle());
		updatedService.setDesc(service.getDesc());
		updatedService.setPrice(service.getPrice());
		updatedService.setDuration(service.getDuration());
		
		repo.save(updatedService);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/jpa/{email}/search/service")
	public List<Service> searchService(@PathVariable String email, @RequestBody Service service){
		String query = service.getTitle();
		
		List<Service> services = new ArrayList<Service>();
		
		if (query != null) {
			List<Service> byTitle = repo.findByTitleContaining(query);
			List<Service> byDesc = repo.findByDescContaining(query);
			
			// Go through Each List and Add
			for(int i=0; i<byTitle.size(); i++) {
				// If the Status is Active
				if(byTitle.get(i).getStatus()) {
					// And it doesn't exist already
					services.add(byTitle.get(i));
				}
			}
						
			// Go through Each List and Add
			for(int i=0; i<byDesc.size(); i++) {
				// If the Status is Active
				if(byDesc.get(i).getStatus()) {
					// And it doesn't exist already
					if(!services.contains(byDesc.get(i))) {
						services.add(byDesc.get(i));
					}
				}
			}
			
			return services;
			
		} else {
			return null;
		}
		
	
	}
	
}
