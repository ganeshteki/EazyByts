import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import ChatRoom from "./components/ChatRoom";
import Navbar from "./components/Navbar";
import './styles.css'; // Make sure this line is there
import './index.css'; // Make sure this line is there


function App() {
    return (
        <Router>
            <Header />
            <Navbar /> {/* Use Navbar in the JSX */}
            <div className="container">
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/chat" element={<ChatRoom />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;