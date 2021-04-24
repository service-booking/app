package com.insert_name.jparepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insert_name.user.BasicUser;
import com.insert_name.user.User;

@Repository
public interface UserJpaRepository extends JpaRepository<User, Long> {
	User findByUsername(String username);
	BasicUser getByUsername(String username);
	
	User findByPassword(String password);
	
	User findUserByEmail(String email);
	BasicUser getByEmail(String email);
}
