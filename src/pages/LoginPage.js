import React, { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        {isLogin ? (
          <Login onToggle={() => setIsLogin(false)} />
        ) : (
          <Register onToggle={() => setIsLogin(true)} />
        )}
      </Paper>
    </Container>
  );
}