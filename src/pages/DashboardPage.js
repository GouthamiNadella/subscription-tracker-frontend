import React, { useEffect, useState, useCallback } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Card, CardContent } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { analyticsAPI } from '../services/api';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DashboardPage() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await analyticsAPI.getDashboard(user.id);
      setDashboard(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const formatActivityMessage = (description) => {
    const priceChangeFromZeroMatch = description.match(/price changed from \$0\.00 to \$([\d.]+)/i);
    if (priceChangeFromZeroMatch) {
      const subscriptionName = description.split(' ')[0];
      return `Added ${subscriptionName} subscription ($${priceChangeFromZeroMatch[1]})`;
    }
    
    if (description.includes('price changed')) {
      return description;
    }
    
    return description;
  };

  const getActivityIcon = (description) => {
    if (description.includes('price changed from $0.00')) {
      return <AddCircleOutlineIcon sx={{ fontSize: 16, color: 'success.main' }} />;
    }
    if (description.includes('price changed')) {
      return <EditIcon sx={{ fontSize: 16, color: 'info.main' }} />;
    }
    if (description.includes('deleted') || description.includes('removed')) {
      return <DeleteIcon sx={{ fontSize: 16, color: 'error.main' }} />;
    }
    if (description.includes('added') || description.includes('created')) {
      return <AddCircleOutlineIcon sx={{ fontSize: 16, color: 'success.main' }} />;
    }
    return null;
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress size={60} />
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track your subscriptions and spending at a glance
      </Typography>
      
      <Grid container spacing={3} sx={{ width: '100%' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={1}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AccountBalanceIcon sx={{ color: 'white', fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Monthly Spending
                  </Typography>
                  <Typography variant="h5" fontWeight={600} sx={{ mt: 0.5 }}>
                    ${dashboard?.totalMonthlySpending?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={1}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'success.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingUpIcon sx={{ color: 'white', fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Yearly Projection
                  </Typography>
                  <Typography variant="h5" fontWeight={600} sx={{ mt: 0.5 }}>
                    ${dashboard?.totalYearlySpending?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={1}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'info.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SubscriptionsIcon sx={{ color: 'white', fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Active Subscriptions
                  </Typography>
                  <Typography variant="h5" fontWeight={600} sx={{ mt: 0.5 }}>
                    {dashboard?.activeSubscriptions || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={1}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'warning.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <NotificationsIcon sx={{ color: 'white', fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Upcoming Renewals
                  </Typography>
                  <Typography variant="h5" fontWeight={600} sx={{ mt: 0.5 }}>
                    {dashboard?.upcomingRenewals || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card elevation={1} sx={{ display: 'block', width: '100%', maxWidth: '100%' }}>
            <CardContent sx={{ p: 3, width: '100%', maxWidth: '100%' }}>
                <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
                  Recent Activity
                </Typography>
                {dashboard?.recentActivity?.length > 0 ? (
                  dashboard.recentActivity.map((activity, index) => {
                    const formattedMessage = formatActivityMessage(activity.description);
                    const icon = getActivityIcon(activity.description);
                    return (
                      <Box 
                        key={index} 
                        sx={{ 
                          mb: 2,
                          pb: 2,
                          borderBottom: index < dashboard.recentActivity.length - 1 ? '1px solid #e0e0e0' : 'none',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1.5,
                        }}
                      >
                        {icon && (
                          <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                            {icon}
                          </Box>
                        )}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ mb: 0.5, display: 'block' }}
                          >
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" color="text.primary" sx={{ wordBreak: 'break-word' }}>
                            {formattedMessage}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <Typography color="text.secondary" variant="body2">
                    No recent activity
                  </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}