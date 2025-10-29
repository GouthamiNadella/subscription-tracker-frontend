import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function SpendingChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="textSecondary">
          No spending data available yet. Track more subscriptions to see trends over time.
        </Typography>
      </Paper>
    );
  }

  const totalSpending = data.reduce((sum, item) => sum + (parseFloat(item.spending) || 0), 0);
  const avgSpending = data.length > 0 ? totalSpending / data.length : 0;
  const currentMonthSpending = data.length > 0 ? parseFloat(data[data.length - 1].spending) || 0 : 0;

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Current Month
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={700}>
            ${currentMonthSpending.toFixed(2)}
          </Typography>
        </Paper>
        <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Average Over {data.length} Months
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={700}>
            ${avgSpending.toFixed(2)}
          </Typography>
        </Paper>
      </Box>

      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Monthly Spending Trends
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1976d2" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [`$${parseFloat(value).toFixed(2)}`, 'Spending']}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: 4 }}
            />
            <Area 
              type="monotone" 
              dataKey="spending" 
              stroke="#1976d2" 
              strokeWidth={3}
              fill="url(#colorSpending)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}