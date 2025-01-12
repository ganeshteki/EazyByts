import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Send login request to backend
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password,
            });

            // Check if response contains a token
            if (response.data.token) {
                // Store the token in LocalStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                alert("Login successful!");
                navigate("/chat"); // Redirect to the chat room page
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;