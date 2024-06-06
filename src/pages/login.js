import React, { useState } from "react";
import firestore from '../firebase';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import ImageTwo from '../images/logincar.png'
import '../styles/login_style.css'
var $ = require("jquery");

function Login({ setIsAuthenticated, setUsername }) {
    const navigate = useNavigate();
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const colors = ["#3457D5","#00308F","#7CB9E8","#007FFF","#B2FFFF","#B9D9EB","#00CED1"]
    let index = 0;
    function changeBackgroundColor(){
        $(".left-container").css("background-color",colors[index]);
        index = (index + 1) % colors.length;
    }

    const ref = collection(firestore, "Users");
    
    setInterval(changeBackgroundColor,2000);
    
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
        if(loginUsername === "" || loginPassword === ""){
            $("#error_message").text("Please enter all fields");
            $("#error_message").css("color","red");
            return;    
        }
        $("#error_message").text("");
        const isAuthenticated = await checkExistingUser();
        if (isAuthenticated) {
            $("#error_message").text("Login Successfully");
            $("#error_message").css("color","green");
            setIsAuthenticated(true);
            setUsername(loginUsername);
            navigate('/mainpage');
        } else {
            $("#error_message").text("Error, user not found or incorrect password");
        }
    };

    return (
        <div className="container bg-body">
            <div className="p-2 login-container">
                <div className="inner-container shadow-lg rounded-5">
                    <div className="half left">
                        <div className="left-container">
                            <img src={ImageTwo} alt="car" className="foreground-image"></img>
                        </div>
                    </div>
                    <div className="half right">
                        <h3 className="site-name">Sign in</h3>
                        <div className="inputs">
                            <div className="form-floating mb-3">
                                <input 
                                    className="form-control" 
                                    type="text"
                                    id="loginUsername"
                                    name="loginUsername"
                                    value={loginUsername}
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                    placeholder="username"/>
                                <label for="loginUsername" class="form-label">Username</label>
                            </div >
                            <div className="form-floating">
                                <input 
                                    className="form-control" 
                                    type="password"
                                    id="loginPassword"
                                    name="loginPassword"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    placeholder="password"/>
                                <label for="loginPassword" class="form-label">Password</label>
                            </div >
                            <p id="error_message"></p>
                            <div className="form-floating">
                                <button className="btn btn-primary btn-lg login-btn" onClick={handleLogin}>Login</button>
                            </div>
                            <div>Don't have an account? <></>
                            <Link to="/register" id="link">register now</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
