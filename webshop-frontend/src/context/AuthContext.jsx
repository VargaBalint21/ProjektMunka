// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Token betöltése a storage-ból
  useEffect(() => {
    const savedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/profile');
      setUser(response.data);
    } catch (err) {
      console.error('Felhasználó betöltése sikertelen', err);
      logout(); // ha a token lejárt vagy hibás
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, remember = false) => {
    const response = await axios.post('http://localhost:8000/api/login', { email, password });
    const receivedToken = response.data.token;

    // Token mentés
    if (remember) {
      localStorage.setItem('token', receivedToken);
    } else {
      sessionStorage.setItem('token', receivedToken);
    }

    setToken(receivedToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;
    await fetchUser();
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout');
    } catch (err) {
      console.warn('Nem sikerült kijelentkezni a backendről');
    }

    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook a könnyebb használathoz
export const useAuth = () => useContext(AuthContext);
