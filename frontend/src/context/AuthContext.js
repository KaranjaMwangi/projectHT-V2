// src/context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [logoutTimer, setLogoutTimer] = useState(null);
  const router = useRouter();

  // Check auth status on initial load
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axios.get('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (data.valid) {
          setUser(data.user);
          startLogoutTimer();
        }
      } catch {
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  // 20-minute session timer
  const startLogoutTimer = () => {
    // Clear any existing timer
    if (logoutTimer) clearTimeout(logoutTimer);

    // Set new timer for 20 minutes (1200000 ms)
    const timer = setTimeout(() => {
      handleLogout();
      alert('Your session has expired. Please login again.');
    }, 20 * 60 * 1000);

    setLogoutTimer(timer);
  };

  const handleLogin = async (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    startLogoutTimer();
    router.push('/');
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      if (logoutTimer) clearTimeout(logoutTimer);
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        handleLogin,
        handleLogout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);