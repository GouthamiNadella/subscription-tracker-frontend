import React, { useMemo } from 'react';
import { Paper, Typography, Box, Card, CardContent, LinearProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function CategoryChart({ data }) {
  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return [...data].sort((a, b) => (b.totalSpending || 0) - (a.totalSpending || 0));
  }, [data]);

  const totalSpending = useMemo(() => {
    return sortedData.reduce((sum, cat) => sum + (cat.totalSpending || 0), 0);
  }, [sortedData]);

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="textSecondary">
          No category data available yet. Add subscriptions to see spending breakdown by category.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      {/* Summary Card */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Total Spending Across Categories
          </Typography>
          <Typography variant="h3" color="primary" fontWeight={700}>
            ${totalSpending.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      {/* Category List with Progress Bars */}
      <Paper sx={{ p: 3, elevation: 1 }}>
        <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
          Spending by Category
        </Typography>
        <Box>
          {sortedData.map((cat, index) => {
            const percentage = totalSpending > 0 ? ((cat.totalSpending || 0) / totalSpending * 100).toFixed(1) : 0;
            return (
              <Box key={index} sx={{ mb: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {cat.category}
                  </Typography>
                  <Box display="flex" alignItems="baseline" gap={1}>
                    <Typography variant="h6" color="primary" fontWeight={700}>
                      ${(cat.totalSpending || 0).toFixed(2)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({percentage}%)
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={parseFloat(percentage)} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 1,
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 1,
                    }
                  }} 
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  {cat.subscriptionCount || 0} subscription{cat.subscriptionCount !== 1 ? 's' : ''}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>

      {/* Bar Chart (Simple Visual) */}
      <Paper sx={{ p: 3, mt: 3, elevation: 1 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Category Comparison
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="category" 
              angle={-45}
              textAnchor="end"
              height={100}
              fontSize={12}
            />
            <YAxis 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${parseFloat(value).toFixed(2)}`, 'Spending']}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0' }}
            />
            <Bar dataKey="totalSpending" fill="#1976d2" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}