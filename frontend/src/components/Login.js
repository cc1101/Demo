import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login, loginError, showAlert} = useContext(AuthContext);

    return (
        <div className="signup-container">
            <h2>Login</h2>
            {loginError && showAlert && <Alert variant="danger" className="mt-3">{loginError}</Alert>}
            <form onSubmit={login} className="signup-form">
                <label>Username*</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password*</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className='green-border-button'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
