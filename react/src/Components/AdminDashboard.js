import React from 'react';
import { Button, Box, Typography } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box>
      <Typography variant="h4">Admin Dashboard</Typography>
      <p>Manage users and monitor activity here.</p>
      <Button variant="contained" color="primary">
        Add New User
      </Button>
      {/* More admin functionalities here */}
    </Box>
  );
};

export default AdminDashboard;
