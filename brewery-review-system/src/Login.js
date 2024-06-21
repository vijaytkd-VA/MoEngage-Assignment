import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/login/', { username, password });
            alert("Login successful!");
            navigate('/search');
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Username: 
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>Password: 
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
                <button type="button" onClick={handleSignup}>Signup</button>
            </form>
        </div>
    );
};

export default Login;
