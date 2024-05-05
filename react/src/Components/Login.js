import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate,Link } from 'react-router-dom';
import { auth } from '../firebase';
import './ComponentStyles.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:6003/login', {  // Adjust URL to your backend endpoint
        method: 'POST',  // Use POST for login
        headers: {
          'Content-Type': 'application/json',  // Send data as JSON
        },
        body: JSON.stringify({ email, password }),  // Credentials to be authenticated
      });
  
      if (response.ok) {
        const result = await response.json();
        const userId = result.user.user_id;  // Get the user ID from the server
        
        localStorage.setItem('user_id', userId);  // Store the user ID in localStorage
        localStorage.setItem('user_name', result.user.name);
        console.log('User ID stored:', userId);  // Log the stored user ID
        navigate('/dashboard');  // Navigate to the dashboard on successful login
      } else {
        const result = await response.json();
        console.error('Login failed:', result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <Box>
      <h2>Login</h2>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <p>
        Don't have an account?{' '}
        <Button component={Link} to="/signup" variant="text" color="primary">
          Sign Up
        </Button>
      </p>
    </Box>
  );
};

export default Login;
