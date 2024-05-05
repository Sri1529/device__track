import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');  // To display validation errors

  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log(name,email,password);
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:6003/signup', {  // Adjust the endpoint URL as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),  // Data to be sent in the request body
      });

      if (response.ok) {  // Successful signup
        const result = await response.json();
        alert('Signup successful!');
        localStorage.setItem('userName', name);
        navigate('/dashboard/account-information');  // Navigate upon success
      } else {
        const result = await response.json();
        setError(result.message);  // Display the error message from the server
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Box>
      <Typography variant="h2">Sign Up</Typography>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <TextField
        label="Name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError('');  // Clear error message when user starts typing
        }}
        fullWidth
        required  // Indicates this field is mandatory
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError('');  // Clear error message when user starts typing
        }}
        fullWidth
        required  // Indicates this field is mandatory
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError('');  // Clear error message when user starts typing
        }}
        fullWidth
        required  // Indicates this field is mandatory
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignup}
        fullWidth
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
