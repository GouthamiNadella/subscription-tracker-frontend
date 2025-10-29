import React from 'react';
import { Paper, Typography, Box} from '@mui/material';

export default function RecentActivity({ activities }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Recent Activity</Typography>
      {activities?.length > 0 ? (
        activities.map((activity, index) => (
          <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: index < activities.length - 1 ? '1px solid #eee' : 'none' }}>
            <Typography variant="body2" color="textSecondary">
              {new Date(activity.timestamp).toLocaleDateString()}
            </Typography>
            <Typography>{activity.description}</Typography>
          </Box>
        ))
      ) : (
        <Typography color="textSecondary">No recent activity</Typography>
      )}
    </Paper>
  )
}