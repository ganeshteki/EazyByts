import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/chat">Chat Room</Link>
        </nav>
    );
}

export default Navbar;