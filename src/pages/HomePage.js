import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return null;
}