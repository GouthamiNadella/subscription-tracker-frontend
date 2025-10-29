import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Subscriptions', icon: <SubscriptionsIcon />, path: '/subscriptions' },
    { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' }
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => { navigate(item.path); onClose(); }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
