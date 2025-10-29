import React from 'react';
import { Grid } from '@mui/material';
import StatusCards from './StatsCards';
import RecentActivity from './RecentActivity';

export default function Dashboard({ dashboard }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StatusCards dashboard={dashboard}/>
      </Grid>
      <Grid item xs={12}>
        <RecentActivity activities={dashboard?.recentActivity} />
      </Grid>
    </Grid>
  );
}