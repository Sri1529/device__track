import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Paper } from '@mui/material';

const AccountInformation = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('user_id');  // Retrieve user ID from localStorage

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:6003/user-details/${userId}`);
        if (response.ok) {
          const result = await response.json();
          setUserDetails(result.user);  // Store user details in state
        } else {
          console.error('Failed to fetch user details');
          setError('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details');
      }
    };

    fetchUserDetails();  // Fetch user details when the component is mounted
  }, [userId]);

  if (error) {  // Display error message
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Error: {error}</Typography>  // Display error message
      </Box>
    );
  }

  if (!userDetails) {  // Display loading state
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',  // Center horizontally
          alignItems: 'center',      // Center vertically
          height: '100vh',           // Full height for vertical centering
        }}
      >
        <CircularProgress />  // Loading spinner
        <Typography variant="h6" sx={{ marginLeft: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  // Centered content with adjustments for overlapping containers
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',  // Center horizontally
        alignItems: 'center',      // Center vertically
        height: '100vh',           // Full height for vertical centering
        backgroundColor: '#f5f5f5',  // Light gray background
        overflow: 'visible',       // Allow content to extend without clipping
        paddingTop: 30,            // Adjust padding to move the box
        paddingLeft: 30,           // Padding to move the box to the right
        paddingRight: 30,          // Padding for left-right movement
      }}
    >
      <Paper
        elevation={3}  // Adds shadow effect
        sx={{
          padding: 4,  // Internal padding
          backgroundColor: 'white',  // White background for contrast
          borderRadius: 2,  // Rounded corners
          width: '400px',  // Fixed width to prevent horizontal scrolling
          textAlign: 'center',  // Center text within the Paper
        }}
      >
        <Typography variant="h5">Account Information</Typography>
        <p>Name: {userDetails.name}</p>
        <p>Email: {userDetails.email}</p>
        <p>Phone: {userDetails.phone_number ? userDetails.phone_number : 'N/A'}</p>
      </Paper>
    </Box>
  );
};

export default AccountInformation;
