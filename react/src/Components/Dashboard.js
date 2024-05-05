import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, Box, List, ListItem, ListItemText } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Outlet, Link } from 'react-router-dom';

const Dashboard = ({ userName, onLogout }) => {
  return (
    <div>
      {/* Header with User Name and Logout Button */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Typography sx={{ marginRight: '20px' }}>
            {userName}
          </Typography>
          <IconButton color="inherit" onClick={onLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar/Navigation */}
      <Drawer variant="permanent" anchor="left" sx={{ width: 240, flexShrink: 0 }}>
        <Box sx={{ width: 240, padding: 2 }}>
          <List>
            <ListItem component={Link} to="account-information">
              <ListItemText primary="Account Information" />
            </ListItem>
            <ListItem component={Link} to="login-history">
              <ListItemText primary="Login History" />
            </ListItem>
            <ListItem component={Link} to="device-management">
              <ListItemText primary="Device Management" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ padding: 3, marginLeft: 240 }}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Dashboard;
