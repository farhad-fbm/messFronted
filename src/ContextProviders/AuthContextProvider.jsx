import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Login function modified to include role
  const login = async (name, password) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { name, password });
      const { token, member } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('userInfo', JSON.stringify(member)); // Save user info to localStorage
      setUser(member);
      setLoading(false);
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // Clear authentication token
    localStorage.removeItem('userInfo'); // Clear user info
    setUser(null); // Reset user state
  };

  // Check if user is authenticated and set the user state
  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    const savedUserInfo = localStorage.getItem('userInfo');

    if (token && savedUserInfo) {
      const parsedUserInfo = JSON.parse(savedUserInfo); // Parse user info from localStorage
      setUser(parsedUserInfo);
    }
  };

  useEffect(() => {
    checkAuth(); // Check authentication on app mount
  }, []);

  const authInfo = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};
