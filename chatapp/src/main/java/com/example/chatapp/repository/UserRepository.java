package com.example.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.chatapp.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by username
    Optional<User> findByUsername(String username);

    // Check if a username already exists
    boolean existsByUsername(String username);
}
