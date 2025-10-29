import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { subscriptionAPI } from '../services/api';
import SubscriptionList from '../components/subscriptions/SubscriptionList';
import AddSubscriptionDialog from '../components/subscriptions/AddSubscriptionDialog';
import EditSubscriptionDialog from '../components/subscriptions/EditSubscriptionDialog';
import AddIcon from '@mui/icons-material/Add';

export default function SubscriptionsPage() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const fetchSubscriptions = useCallback(async () => {
    try {
      const response = await subscriptionAPI.getUserSubscriptions(user.id);
      const activeSubscriptions = response.data.filter(
        sub => sub.status !== 'CANCELLED' && sub.status !== 'CANCELED'
      );
      setSubscriptions(activeSubscriptions);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const handleAdd = async (formData) => {
    try {
      const subscriptionData = {
        ...formData,
        userId: user.id,
        price: parseFloat(formData.price),
        nextRenewalDate: new Date(formData.nextRenewalDate).toISOString()
      };
      await subscriptionAPI.createSubscription(subscriptionData);
      fetchSubscriptions();
      setOpenAdd(false);
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('Failed to create subscription');
    }
  };

  const handleEdit = async (formData) => {
    try {
      const subscriptionData = {
        ...formData,
        userId: user.id,
        price: parseFloat(formData.price),
        nextRenewalDate: new Date(formData.nextRenewalDate).toISOString()
      };
      await subscriptionAPI.updateSubscription(selectedSubscription.id, subscriptionData);
      fetchSubscriptions();
      setOpenEdit(false);
      setSelectedSubscription(null);
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await subscriptionAPI.deleteSubscription(id);
        
        setSubscriptions(prev => {
          return prev.filter(sub => sub.id !== id);
        });
      } catch (error) {
        console.error('Error deleting subscription:', error);
        alert('Failed to delete subscription: ' + error.message);
      }
    }
  };

  const openEditDialog = (subscription) => {
    setSelectedSubscription(subscription);
    setOpenEdit(true);
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">My Subscriptions</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAdd(true)}>
          Add Subscription
        </Button>
      </Box>

      <SubscriptionList subscriptions={subscriptions} onDelete={handleDelete} onEdit={openEditDialog} />

      <AddSubscriptionDialog open={openAdd} onClose={() => setOpenAdd(false)} onSubmit={handleAdd} />
      
      <EditSubscriptionDialog 
        open={openEdit} 
        onClose={() => { setOpenEdit(false); setSelectedSubscription(null); }} 
        onSubmit={handleEdit}
        subscription={selectedSubscription}
      />
    </Container>
  );
}