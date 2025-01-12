package com.example.chatapp.service;

import com.example.chatapp.entity.User;
import com.example.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SessionManager sessionManager;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, SessionManager sessionManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.sessionManager = sessionManager;
    }

    // Register a new user and hash the password before saving
    public void registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hashing password
        userRepository.save(user);
    }

    // Authenticate user (validate username and password) and create a session
    public String authenticateUser(User user) {
        Optional<User> existingUserOptional = userRepository.findByUsername(user.getUsername());
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            // Validate the hashed password
            if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                // Delegate session creation to SessionManager
                String token = sessionManager.createSession(user.getUsername());
                return token;
            }
        }
        throw new IllegalArgumentException("Invalid username or password");
    }

    // Find user by username
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Find user ID by username
    public Long findUserIdByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }

    // Load user by username (for Spring Security)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                new ArrayList<>()
        );
    }

    // Validate password (hash comparison)
    public boolean validatePassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }
}
