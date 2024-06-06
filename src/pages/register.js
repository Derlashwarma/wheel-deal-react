import React, { useState, useEffect } from "react";
import firestore from '../firebase';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import '../styles/register_style.css'
var $ = require("jquery");

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const colors = ["#E5554E","#CF352E"," #B02B25","#922822","#792723"];
    let index = 0;
    function changeBackground(){
        $(".right-register-container").css('background-color',colors[index]);
        index = (index+1)%colors.length;
        
    }
    setInterval(changeBackground,2500);
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
        if(confirmPassword !== password) {
            error_message.text("Password do not match");
            error_message.css('color','red');
            return;
        }
        if (!(await checkExistingUser())) {
            error_message.text("Username already taken");
            error_message.css('color','red');
            return false;
        }
        const user = {
            email: email,
            username: username,
            password: password
        };
        try {
            await addDoc(ref, user);
            setUsername("")
            setPassword("");
            setEmail("");
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
          <div className="register-container bg-body rounded-5 shadow-lg">
            <div className="horizontal-container">
                <div className="left-registration half">
                <div className="register-inputs ml-5">
                        <h2 id="registration">Registration</h2>
                        <div className="form-floating mb-3">
                            <input 
                                className="form-control" 
                                type="text" 
                                id="username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                placeholder="Username"
                                />
                            <label for="loginUsername" class="form-label">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                className="form-control" 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Email"
                                />
                            <label for="email" class="form-label">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                className="form-control"
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password"
                                />  
                            <label className="form-label">Password</label>  
                        </div>    
                        <div className="form-floating">
                            <input 
                                className="form-control"
                                type="password" 
                                id="confirmPassword" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                placeholder="Confirm Password"
                                />  
                            <label className="form-label">Confirm Password</label>  
                        </div> 
                        <p id="error_message" className="mb-3"></p>
                        <button className="form-control btn btn-danger btn-lg" onClick={handleSave}>Register</button>
                    </div>
                </div>
                <div className="right-registration half">
                    <div className="right-register-container">

                    </div>
                </div>
            </div>
          </div>
        </div>
    );
}

export default Register;
