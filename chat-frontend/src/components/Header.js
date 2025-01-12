import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token"); // Check if the user is logged in

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        localStorage.removeItem("userId"); // Remove user ID (if stored)
        navigate("/login"); // Redirect to the login page
    };

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="logo">Chat Application</h1>
                <div className="auth-links">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
