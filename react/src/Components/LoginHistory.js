import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
const LoginHistoryByUser = () => {
  const [loginHistory, setLoginHistory] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('user_id');  // Get user_id from local storage
console.log(loginHistory);
  console.log('User ID:', userId);  // Log user_id to ensure it's correct

  useEffect(() => {
    const fetchLoginHistory = async () => {
      if (!userId) {  // Handle missing user_id
        setError('No user ID found');
        return;
      }

      try {
        const response = await fetch(`http://localhost:6003/login-history/${userId}`);
        if (response.ok) {
          const result = await response.json();
          console.log('Fetched login history:', result);  // Log the fetched data
          setLoginHistory(result);
        } else {
          const errorText = await response.text();
          console.error('Fetch error:', errorText);
          setError('Failed to fetch login history');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setError('An error occurred while fetching login history');
      }
    };

    fetchLoginHistory();  // Fetch data when the component mounts
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;  // Display error message
  }

  if (loginHistory.length === 0) {
    return <div>No login history found for this user.</div>;  // Handle empty data
  }

  return (
    // Component to display the login history data
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>History ID</TableCell>
            <TableCell>Login Time</TableCell>
            <TableCell>Logout Time</TableCell>
            <TableCell>Device Info</TableCell>
            <TableCell>Location Info</TableCell>
            <TableCell>Activity Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loginHistory.map((entry) => (
            <TableRow key={entry.history_id}>
              <TableCell>{entry.history_id}</TableCell>
              <TableCell>{entry.login_time}</TableCell>
              <TableCell>{entry.logout_time}</TableCell>
              <TableCell>{entry.device_info}</TableCell>
              <TableCell>{entry.location_info}</TableCell>
              <TableCell>{entry.activity_type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default LoginHistoryByUser;
