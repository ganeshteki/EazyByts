// src/main/java/com/example/chatapp/service/SessionManager.java

package com.example.chatapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.chatapp.util.JwtUtil;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Component
public class SessionManager {

    private final JwtUtil jwtUtil;
    private final ConcurrentMap<String, String> userSessions = new ConcurrentHashMap<>();

    @Autowired
    public SessionManager(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public String createSession(String username) {
        String token = jwtUtil.generateToken(username); // Use JwtUtil here
        userSessions.put(username, token);
        return token;
    }

    public boolean isSessionValid(String username, String token) {
        return token.equals(userSessions.get(username)) && jwtUtil.validateToken(token, username);
    }

    public void invalidateSession(String username) {
        userSessions.remove(username);
    }
}

