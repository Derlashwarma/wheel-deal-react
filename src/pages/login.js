import React, { useState } from "react";
import firestore from '../firebase';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
var $ = require("jquery");

function Login({ setIsAuthenticated, setUsername }) {
    const navigate = useNavigate();
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const ref = collection(firestore, "Users");
    
    const checkExistingUser = async () => {
        const q = query(ref, where("username", "==", loginUsername));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            if (userData.password === loginPassword) {
                return true; 
            }
        }
        return false;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        $("#error_message").text("");
        const isAuthenticated = await checkExistingUser();
        if (isAuthenticated) {
            setIsAuthenticated(true);
            setUsername(loginUsername);
            navigate('/mainpage');
        } else {
            $("#error_message").text("Error, user not found or incorrect password");
        }
    };

    return (
        <div className="container">
            <h3>Login</h3>
            <input 
                type="text"
                id="loginUsername"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
            />
            <input 
                type="password"
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
            />
            <p onClick={handleLogin}>Login</p>
            <p id="error_message" style={{ color: 'red' }}></p>
            <Link to="/register">To Registration</Link>
        </div>
    );
}

export default Login;
