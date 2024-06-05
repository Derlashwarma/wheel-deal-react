import React, { useState, useEffect } from "react";
import firestore from '../firebase';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
var $ = require("jquery");

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const ref = collection(firestore, "Users");

    const checkExistingUser = async () => {
        const q = query(ref, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return false; 
        }
        return true; 
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const error_message = $('#error_message');
        if (!(await checkExistingUser())) {
            error_message.text("Username already taken");
            error_message.css('color','red');
            return false;
        }
        const user = {
            username: username,
            password: password
        };
        try {
            await addDoc(ref, user);
            setUsername("")
            setPassword("");
            error_message.text("Registration successful");
            error_message.css('color','green');
            return true;
        } catch (error) {
            error_message.text("Something went wrong " + error);
            error_message.css('color','red');
        }
    }
    
    useEffect(() => {
        document.title = username? `Register - ${username}` : 'Register';
    }, [username]);

    return (
        <div className="container">
          <h2>Registration</h2>
          <form onSubmit={handleSave}>
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            
            <button type="submit">Register</button>
          </form>
          <p id="error_message"></p>
        </div>
    );
}

export default Register;
