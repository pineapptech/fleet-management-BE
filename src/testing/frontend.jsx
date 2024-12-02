import axios from 'axios';

// Create an axios instance with base configuration
const api = axios.create({
    baseURL: 'http://your-backend-api-url', // Replace with your actual backend URL
    withCredentials: true // Important for handling cookies
});

const login = async (email, password) => {
    try {
        const response = await api.post('/login', {
            email,
            password
        });

        // If login is successful
        if (response.data.status === true) {
            // Handle successful login
            console.log('Logged in successfully');
            console.log('User email:', response.data.data[0].email);

            // Optional: You might want to store some user info in local storage
            localStorage.setItem('userEmail', response.data.data[0].email);

            // Redirect or update app state
            return response.data;
        }
    } catch (error) {
        // Handle login errors
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Login error:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received');
            throw new Error('No response from server');
        } else {
            // Something happened in setting up the request
            console.error('Error', error.message);
            throw error;
        }
    }
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await login(email, password);

            // After successful login, redirect or update app state
            navigate('/dashboard'); // Example navigation
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
}
