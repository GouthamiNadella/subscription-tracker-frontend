import React from 'react';
import { Typography, Grid } from '@mui/material';
import SubscriptionCard from './SubscriptionCard';

export default function SubscriptionList({ subscriptions, onDelete, onEdit }) {
  if (subscriptions.length === 0) {
    return (
      <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
        No subscriptions yet. Click "Add Subscription" to get started!
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {subscriptions.map((sub, index) => (
        <Grid item key={sub.id || index} xs={12} sm={6} md={4}>
          <SubscriptionCard subscription={sub} onDelete={onDelete} onEdit={onEdit} />
        </Grid>
      ))}
    </Grid>
  );
}
