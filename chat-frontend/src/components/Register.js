import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/register", {
                username,
                password,
            });

            // Show success alert
            alert(response.data);

            // After registration, redirect to login page
            navigate("/login");
        } catch (error) {
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <div className="form-container">
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
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
}

export default Register;