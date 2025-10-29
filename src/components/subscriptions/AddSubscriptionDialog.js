import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

const categories = ['Entertainment', 'Productivity', 'Software', 'Music', 'Video', 'Cloud Storage', 'News', 'Fitness', 'Other'];

export default function AddSubscriptionDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '', planName: '', price: '', category: '', card: '', nextRenewalDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', planName: '', price: '', category: '', card: '', nextRenewalDate: '' });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Subscription</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Service Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            required
            placeholder="e.g., Netflix, Spotify"
          />
          <TextField
            fullWidth
            label="Plan Name"
            value={formData.planName}
            onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
            margin="normal"
            placeholder="e.g., Premium, Basic"
          />
          <TextField
            fullWidth
            label="Monthly Price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            margin="normal"
            required
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            fullWidth
            select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            margin="normal"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Payment Card"
            value={formData.card}
            onChange={(e) => setFormData({ ...formData, card: e.target.value })}
            margin="normal"
            placeholder="e.g., Chase Freedom"
          />
          <TextField
            fullWidth
            label="Next Renewal Date"
            type="date"
            value={formData.nextRenewalDate}
            onChange={(e) => setFormData({ ...formData, nextRenewalDate: e.target.value })}
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Add Subscription</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}