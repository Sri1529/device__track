import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AccountInformation from './Components/AccountInformation';
import LoginHistory from './Components/LoginHistory';
import DeviceManagement from './Components/DeviceManagement';
import { useNavigate,Link } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<Dashboard userName={userName} onLogout={() =>  navigate('/')} />}
        >
          <Route path="account-information" element={<AccountInformation />} />
          <Route path="login-history" element={<LoginHistory />} />
          <Route path="device-management" element={<DeviceManagement />} />
        </Route>
      </Routes>
    
  );
}

export default App;
