import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function StatusCards({ dashboard }) {
  const stats = [
    {
      title: 'Monthly Spending',
      value: `$${dashboard?.totalMonthlySpending?.toFixed(2) || '0.00'}`,
      icon: <AccountBalanceIcon color="primary" sx={{ fontSize: 40 }} />
    },
    {
      title: 'Yearly Projection',
      value: `$${dashboard?.totalYearlySpending?.toFixed(2) || '0.00'}`,
      icon: <TrendingUpIcon color="success" sx={{ fontSize: 40 }} />
    },
    {
      title: 'Active Subscriptions',
      value: dashboard?.activeSubscriptions || 0,
      icon: <SubscriptionsIcon color="info" sx={{ fontSize: 40 }} />
    },
    {
      title: 'Upcoming Renewals',
      value: dashboard?.upcomingRenewals || 0,
      icon: <NotificationsIcon color="warning" sx={{ fontSize: 40 }} />
    }
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            {stat.icon}
            <Box>
              <Typography color="textSecondary" variant="body2">{stat.title}</Typography>
              <Typography variant="h5">{stat.value}</Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}