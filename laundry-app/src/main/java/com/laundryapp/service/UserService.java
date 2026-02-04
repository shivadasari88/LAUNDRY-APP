package com.laundryapp.service;

import org.springframework.beans.factory.annotation.Autowired;
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
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        userRepository.save(user);

        return "Registration successful";
    }

    public User login(LoginRequest request) {
        // This method is now legacy/unused by AuthController but kept as helper if
        // needed
        return userRepository.findByUsername(request.getUsername());
    }
}
