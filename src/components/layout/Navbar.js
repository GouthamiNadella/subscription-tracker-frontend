import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Subscription Tracker
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/dashboard')} startIcon={<DashboardIcon />}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate('/subscriptions')} startIcon={<SubscriptionsIcon />}>
            Subscriptions
          </Button>
          <Button color="inherit" onClick={() => navigate('/analytics')} startIcon={<BarChartIcon />}>
            Analytics
          </Button>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout ({user?.name})
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}