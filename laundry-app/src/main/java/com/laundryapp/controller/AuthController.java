package com.laundryapp.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laundryapp.dto.LoginRequest;
import com.laundryapp.dto.RegisterRequest;
import com.laundryapp.entity.User;
import com.laundryapp.security.JwtUtil;
import com.laundryapp.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userService.login(request);

        String token = jwtUtil.generateToken(user); // ✅ FIXED

        return ResponseEntity.ok(
            Map.of(
                "token", token,
                "username", user.getUsername(),
                "role", user.getRole()
            )
        );
    }

}

