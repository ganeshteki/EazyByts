package com.example.chatapp.websocket;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ChatWebSocketHandler extends TextWebSocketHandler {

    private static final Logger logger = LoggerFactory.getLogger(ChatWebSocketHandler.class);

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            logger.info("Received message: " + message.getPayload());
            session.sendMessage(new TextMessage("Message received: " + message.getPayload()));
        } catch (Exception e) {
            logger.error("Error handling message", e);
            try {
                session.sendMessage(new TextMessage("Error processing your message"));
            } catch (Exception ex) {
                logger.error("Error sending error message to client", ex);
            }
        }
    }
}
