package com.neservice.jparepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neservice.user.BasicUser;
import com.neservice.user.User;

@Repository
public interface UserJpaRepository extends JpaRepository<User, Long> {
	User findByUsername(String username);
	BasicUser getByUsername(String username);
	
	User findByPassword(String password);
}
