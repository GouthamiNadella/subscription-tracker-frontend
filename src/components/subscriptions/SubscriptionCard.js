import React from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function SubscriptionCard({ subscription, onDelete, onEdit }) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
          <Typography variant="h6">
            {subscription.name || 'Unnamed Subscription'}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit && onEdit(subscription)}>
              <EditIcon />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => {
                if (onDelete) {
                  onDelete(subscription.id);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Chip
          label={subscription.category || 'Other'}
          size="small"
          sx={{ mb: 1 }}
        />

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Monthly: ${subscription.price?.toFixed(2) || '0.00'}/USD
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Yearly: ${subscription.yearlyPrice?.toFixed(2) || '0.00'}/USD
        </Typography>

        {subscription.planName && (
          <Typography variant="body2" color="textSecondary">
            Plan: {subscription.planName}
          </Typography>
        )}

        {subscription.card && (
          <Typography variant="body2" color="textSecondary">
            Card: {subscription.card}
          </Typography>
        )}

        <Box mt={2} pt={2} borderTop="1px solid #eee">
          <Typography variant="body2" color="textSecondary">
            Next Renewal: {subscription.daysUntilRenewal != null ? `${subscription.daysUntilRenewal} days` : 'Not set'}
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Chip
              label={subscription.expiringSoon ? 'Expiring Soon' : 'ACTIVE'}
              size="small"
              color={subscription.expiringSoon ? 'warning' : 'success'}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}