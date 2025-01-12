package com.example.chatapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.example.chatapp.entity.ChatRoom;
import com.example.chatapp.entity.Message;
import com.example.chatapp.service.ChatRoomService;
import com.example.chatapp.service.MessageService;
import com.example.chatapp.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private MessageService messageService;
    
    @Autowired
    private ChatRoomService chatRoomService;

    @Autowired
private UserService userService;

    
    @PostMapping("/message")
public String sendMessage(@RequestBody Message message) {
    // Extract the username from the SecurityContext
    String username = SecurityContextHolder.getContext().getAuthentication().getName();

    // Use the username to find the userId
    Long userId = userService.findUserIdByUsername(username);

    // Save the message with the resolved userId
    messageService.saveMessage(message, userId);

    return "Message sent";
}


    @PostMapping("/createRoom")
    public String createRoom(@RequestBody ChatRoom chatRoom) {
        chatRoomService.createChatRoom(chatRoom);
        return "Chat room created";
    }
    // Get all chat rooms
    @GetMapping("/rooms")
    public List<ChatRoom> getAllChatRooms() {
        return chatRoomService.getAllChatRooms();
    }

    // Get messages for a specific chat room
    @GetMapping("/rooms/{id}/messages")
    public List<Message> getMessagesByChatRoom(@PathVariable Long id) {
        return chatRoomService.getMessagesByChatRoomId(id);
    }
}