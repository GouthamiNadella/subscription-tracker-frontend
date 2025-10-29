import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Tabs, Tab, Box, CircularProgress, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { analyticsAPI } from '../services/api';
import SpendingChart from '../components/analytics/SpendingChart';
import CategoryChart from '../components/analytics/CategoryChart';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [trendData, setTrendData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  const fetchAnalytics = useCallback(async () => {
    try {
      const [trendsRes, categoryRes] = await Promise.all([
        analyticsAPI.getSpendingTrends(user.id, 12),
        analyticsAPI.getCategoryBreakdown(user.id)
      ]);
      
      setTrendData(trendsRes.data.monthlyData || []);
      setCategoryData(categoryRes.data.categoryData || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress size={60} /></Box>;

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track your subscription spending patterns and insights
      </Typography>

      <Paper elevation={1} sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, v) => setTabValue(v)}
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        >
          <Tab label="Spending Trends" />
          <Tab label="Category Breakdown" />
        </Tabs>
      </Paper>

      {tabValue === 0 && <SpendingChart data={trendData} />}
      {tabValue === 1 && <CategoryChart data={categoryData} />}
    </Container>
  );
}
