package com.example.chatapp.service;

import com.example.chatapp.entity.Message;
import com.example.chatapp.entity.User;
import com.example.chatapp.repository.MessageRepository;
import com.example.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public void saveMessage(Message message, Long userId) {
        // Fetch the user by userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Set user and timestamp
        message.setUser(user);
        message.setTimestamp(LocalDateTime.now());

        // Save message
        messageRepository.save(message);
    }
}