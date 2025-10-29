import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login ({ onToggle }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      login(response.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}
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
        {loading ? 'Please wait...' : 'Login'}
      </Button>
      <Button onClick={onToggle} fullWidth>Need an account? Register</Button>
    </Box>
  );
}