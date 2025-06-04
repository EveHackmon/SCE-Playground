import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api.js';

export const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidating, setIsValidating] = useState(true);

  // 1. Load from storage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
      console.log('Loading token from localStorage:', storedToken);
      setToken(storedToken);
    }
    if (storedUser) {
      console.log('Loading user from localStorage:', storedUser);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // 2. Save token changes
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  // 3. Save user changes
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  // 4. Validate token after loading
  useEffect(() => {
    const validate = async () => {
      if (isLoading) return;

      if (token) {
        try {
          const { data } = await api.post('/auth/validate-token', { token });
          if (data.isValid) {
            console.log('Token is valid');
            setIsValidating(false);
            return;
          }
        } catch (err) {
          console.error('Token validation error:', err);
        }
      }

      // If token invalid or not present
      console.log('Token invalid or not found. Signing out.');
      signOut();
      setIsValidating(false);
    };

    validate();
  }, [isLoading, token]);

  const signIn = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    signIn,
    signOut,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
