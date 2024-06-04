import React from "react";
import { Link } from "react-router-dom";
function Login(){
    return (
        <div className="container">
            <h3>Login</h3>
            <Link to="/register">To Registration</Link>
        </div>
    )
}
export default Login;