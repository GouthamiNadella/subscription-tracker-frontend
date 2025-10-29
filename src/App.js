import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import Navbar from './components/layout/Navbar';
import { Box } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">Loading...</Box>;
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      {user && <Navbar />}
      <Box sx={{ pt: user ? 8 : 0 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/subscriptions" element={<PrivateRoute><SubscriptionsPage /></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute><AnalyticsPage /></PrivateRoute>} />
        </Routes>
      </Box>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}