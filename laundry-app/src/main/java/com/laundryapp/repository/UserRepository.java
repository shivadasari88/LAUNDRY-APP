package com.laundryapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laundryapp.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	boolean existsByUsername(String username);

	User findByUsername(String username);

	java.util.List<User> findByRole(com.laundryapp.entity.Role role);
}
