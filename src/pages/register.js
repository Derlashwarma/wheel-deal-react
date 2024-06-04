import React, { useState, useEffect } from "react";
import firestore from '../firebase';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const ref = collection(firestore, "Users");

    const checkExistingUser = async () => {
        const q = query(ref, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            alert("An account with this username already exists.");
            return false; // Prevent further execution
        }
        return true; // Proceed with registration
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!(await checkExistingUser())) {
            return;
        }
        const user = {
            username: username,
            passwordHash: password // Remember to hash passwords before storing them
        };
        try {
            await addDoc(ref, user);
            console.log("User added successfully");
            return true;
        } catch (error) {
            console.log("Something went wrong: ", error);
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
        </div>
    );
}

export default Register;
