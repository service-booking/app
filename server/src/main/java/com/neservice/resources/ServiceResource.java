package com.neservice.resources;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
	private ServiceRepo srepo;	
	
	@GetMapping("/jpa/{email}/get/service/{id}")
	public Optional<Service> getService(@PathVariable String email, @PathVariable String id){
		return srepo.findById(id);
	}
	
	@GetMapping("/jpa/{email}/get/services")
	public List<Service> getAllServices(@PathVariable String email){
		List<Service> services = new ArrayList<Service>(srepo.findByEmail(email));
		
		for(int i=0; i<services.size(); i++) {
			if(services.get(i).getStatus() == false) {
				services.remove(i);
			}
		}
		
		return services;
	}
	
	@PostMapping("/jpa/{email}/create/service")
	public ResponseEntity<Void> createService(@PathVariable String email, @RequestBody Service service){
		service.setEmail(email);
		
		service.displayService();
		
		srepo.save(service);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/jpa/{email}/disable/service/{id}")
	public ResponseEntity<Void> disableService(@PathVariable String email, @PathVariable String id) {
		Optional<Service> service = srepo.findById(id);
		
		//service.get().displayService();
		service.get().setStatus(false);
		//service.get().displayService();
		
		srepo.save(service.get());
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/jpa/{email}/update/service/{id}")
	public ResponseEntity<Void> updateService (
			@PathVariable String email,
			@PathVariable String id,
			@RequestBody Service service			
		){
		Optional<Service> updatedService = srepo.findById(id);
		updatedService.get().setTitle(service.getTitle());
		updatedService.get().setDesc(service.getDesc());
		updatedService.get().setPrice(service.getPrice());
		updatedService.get().setDuration(service.getDuration());
		
		srepo.save(updatedService.get());
		return ResponseEntity.noContent().build();
	}
	
}
