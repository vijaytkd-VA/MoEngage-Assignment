import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/signup/', { username, password, email });
            alert("Signup successful!");
            navigate('/');
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    const handleLogin = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <label>Username: 
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>Password: 
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>Email: 
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <button type="submit">Signup</button>
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};

export default Signup;
