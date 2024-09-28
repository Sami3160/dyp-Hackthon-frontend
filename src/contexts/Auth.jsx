import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

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
        const id=localStorage.getItem('token')
        const response = await axios.get('http://localhost:4000/get-user-info/'+id);
        console.log(response.data)

        setAuth({ user: response.data, token });
        document.localStorage="token="+response.data.id
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
      await axios.post('http://localhost:4000/create-event-booking');
      initializeAuth();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };



  const login = async (email, password) => {
    try {
      console.log(email)
      console.log(password)
      const response = await axios.post('http://localhost:4000/login', {
          email:email,
          password:password
      });
      const { user, token } = response.data;
      console.log(response)
      console.log(response.data)
      setAuth({ user, token });
      localStorage.setItem('token', token);
      
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // return "success"
      return {status:"success",message:"Login Successful"}
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      // setServerError(errorMessage);
      alert(errorMessage)
      return {status:"error",message:errorMessage}

    }
  };

  const signUp = async (name, email, password, role) => {
    try {
      console.log("started signup");
      if(!role)role="organizer" 
      const response = await axios.post('http://localhost:4000/create-user', {
        name,
        email,
        password,
        role,
      });
      // console.log("started mid");
      const { user, token } = response.data;
      setAuth({ user, token });
      localStorage.setItem('token', token);
      console.log("token"+response.data.id);
      console.log(response.data);
      
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      alert("Signup Successful")
      return "success"
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Sign up failed. Please try again.';
      // setServerError(errorMessage);
      alert(errorMessage)
      return "error";
    }
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('token');
    // delete axios.defaults.headers.common['Authorization'];
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