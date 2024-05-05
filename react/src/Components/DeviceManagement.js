import React from 'react';
import { Typography, List, ListItem, Button } from '@mui/material';

const DeviceManagement = () => {
  const devices = [
    { name: 'Chrome on Windows', lastUsed: '2024-05-04' },
    { name: 'Safari on iOS', lastUsed: '2024-05-03' },
  ];

  const revokeAccess = (deviceName) => {
    console.log(`Access revoked for device: ${deviceName}`);
  };

  return (
    <div>
      <Typography variant="h5">Device Management</Typography>
      <List>
        {devices.map((device, index) => (
          <ListItem key={index}>
            {device.name} - Last used: {device.lastUsed}
            <Button onClick={() => revokeAccess(device.name)} color="secondary">
              Revoke Access
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DeviceManagement;
