import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        localStorage.removeItem("userId"); // Remove user ID
        alert("You have been logged out.");
        navigate("/login"); // Redirect to the login page
    };

    return (
        <button onClick={handleLogout} style={{ marginRight: "10px" }}>
            Logout
        </button>
    );
}

export default Logout;
