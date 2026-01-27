package com.laundryapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.laundryapp.dto.LoginRequest;
import com.laundryapp.dto.RegisterRequest;
import com.laundryapp.entity.User;
import com.laundryapp.repository.UserRepository;

@Service
public class UserService {
	

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return "Username already exists";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // plain text for phase 1
        user.setRole(request.getRole());

        userRepository.save(user);

        return "Registration successful";
    }

    public User login(LoginRequest request) {

    	User user = userRepository.findByUsername(request.getUsername())
    	        .orElseThrow(() -> new RuntimeException("User not found"));


        if (!passwordEncoder.matches(request.getPassword(),user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

}

