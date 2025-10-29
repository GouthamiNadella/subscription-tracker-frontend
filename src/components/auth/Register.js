import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register({ onToggle }) {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      login(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        fullWidth
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }} disabled={loading}>
        {loading ? 'Please wait...' : 'Register'}
      </Button>
      <Button onClick={onToggle} fullWidth>Have an account? Login</Button>
    </Box>
  );
}