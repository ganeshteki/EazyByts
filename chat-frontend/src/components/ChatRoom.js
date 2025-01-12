import React, { useState, useEffect } from "react";
import axios from "axios";

function ChatRoom() {
    const [chatRooms, setChatRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [newRoomName, setNewRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);

    // Fetch all chat rooms
    useEffect(() => {
        fetchChatRooms();
    }, []);

    // Fetch all chat rooms
    const fetchChatRooms = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get("http://localhost:8080/chat/rooms", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setChatRooms(response.data);
        } catch (error) {
            console.error("Error fetching chat rooms:", error);
            alert("Failed to fetch chat rooms.");
        }
    };

    // Handle room selection
    const handleRoomSelect = async (roomId) => {
        setSelectedRoomId(roomId); // Set the selected room ID
        fetchMessages(roomId); // Fetch messages for this room
        setupWebSocket(roomId); // Set up WebSocket connection
    };

    // Fetch messages for the selected chat room
    const fetchMessages = async (roomId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User is not authenticated.");
            return;
        }
        try {
            const response = await axios.get(
                `http://localhost:8080/chat/rooms/${roomId}/messages`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
            alert("Failed to fetch messages.");
        }
    };

    // Set up WebSocket for real-time message updates
    const setupWebSocket = (roomId) => {
        // Create a new WebSocket connection for the selected chat room
        const socket = new WebSocket(`ws://localhost:8080/chat/${roomId}`);

        socket.onopen = () => {
            console.log("WebSocket connection established for room:", roomId);
        };

        socket.onmessage = (event) => {
            console.log("Received message:", event.data);
            const newMessage = JSON.parse(event.data); // Assuming the server sends a JSON object
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.onerror = (error) => {
            console.log("WebSocket error:", error);
        };

        // Store the socket in state so we can close it when needed
        setSocket(socket);
    };

    // Send a new message to the chat room
    const handleSendMessage = async () => {
        if (!newMessage.trim()) {
            alert("Message cannot be empty");
            return;
        }

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
    
        if (!userId) {
            alert("User not authenticated. Please log in.");
            return;
        }
    
        const messageData = {
            content: newMessage,
            chatRoom: {
                id: selectedRoomId,
            },
        
        };
    
        try {
            await axios.post("http://localhost:8080/chat/message", messageData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNewMessage(""); // Clear the input field
        } catch (error) {
            console.error("Error sending message:", error.response?.data || error.message);
            alert("Failed to send message.");
        }
    };

    // Create a new chat room
    const handleCreateRoom = async () => {
        if (!newRoomName) {
            alert("Please enter a room name.");
            return;
        }

        const token = localStorage.getItem("token");
        try {
            await axios.post(
                "http://localhost:8080/chat/createRoom",
                { name: newRoomName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setNewRoomName(""); // Clear input
            fetchChatRooms(); // Refresh chat rooms list
        } catch (error) {
            console.error("Error creating room:", error);
            alert("Failed to create room.");
        }
    };

    // Clean up WebSocket connection on unmount or room change
    useEffect(() => {
        return () => {
            if (socket) {
                socket.close();
                console.log("WebSocket connection closed");
            }
        };
    }, [socket]);

    return (
        <div>
            <h2>Chat Rooms</h2>
            <input
                type="text"
                placeholder="Enter room name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
            />
            <button onClick={handleCreateRoom}>Create Room</button>

            <h3>Available Chat Rooms</h3>
            <ul>
                {chatRooms.map((room) => (
                    <li
                        key={room.id}
                        onClick={() => handleRoomSelect(room.id)}
                        style={{
                            cursor: "pointer",
                            fontWeight: selectedRoomId === room.id ? "bold" : "normal",
                        }}
                    >
                        {room.name}
                    </li>
                ))}
            </ul>

            <h3>Messages</h3>
            {selectedRoomId ? (
                <>
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>{msg.content}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="Type your message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!selectedRoomId || !newMessage.trim()}
                    >
                        Send
                    </button>
                </>
            ) : (
                <p>Select a chat room to see messages.</p>
            )}
        </div>
    );
}

export default ChatRoom;