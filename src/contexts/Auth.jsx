import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Token } from '@mui/icons-material';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  const initializeAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const id=localStorage.getItem('id')
        const response = await axios.get('http://localhost:8000/get-user-info/'+id);

        setAuth({ user: response.data, token });
        document.localStorage="token="+token
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        localStorage.removeItem('token');
      }
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const addEvent = async (id) => {
    try {
      await axios.post('http://localhost:8000/user/events');
      toast.success("Added ");
      initializeAuth();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart.');
    }
  };



  const login = async (email, password, setServerError) => {
    try {
      const response = await axios.post('http://localhost:8000/user/login', {
        email,
        password,
      });
      const { user, token } = response.data;
      setAuth({ user, token });
      localStorage.setItem('token', token);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      toast.success('Login successful.');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      setServerError(errorMessage);

    }
  };

  const signUp = async (name, email, password, setServerError) => {
    try {
      const response = await axios.post('http://localhost:8000/user/signup', {
        name,
        email,
        password,
      });
      const { user, token } = response.data;
      setAuth({ user, token });
      localStorage.setItem('token', token);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      toast.success('Sign up successful.');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Sign up failed. Please try again.';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('token');
    // delete axios.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, signUp, addEvent }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};