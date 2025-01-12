package com.example.chatapp.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.chatapp.entity.User;
import com.example.chatapp.service.UserService;
import com.example.chatapp.service.SessionManager;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private SessionManager sessionManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Check if username already exists
        if (userService.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        // Register the user with a hashed password
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            // Authenticate the user and create a session token
            String token = userService.authenticateUser(user);

            // Return the token in a response entity as JSON
            return ResponseEntity.ok(new HashMap<String, String>() {{
                put("token", token);
            }});
        } catch (IllegalArgumentException e) {
            // Return an HTTP 401 Unauthorized response for invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestParam String username) {
        // Invalidate the user session
        sessionManager.invalidateSession(username);
        return ResponseEntity.ok("User logged out successfully");
    }
}
