import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const storedUser = await AsyncStorage.getItem('user_session');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.log('Failed to load user', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Fetch all registered users
      const storedUsers = await AsyncStorage.getItem('users_db');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        const userSession = { name: foundUser.name, email: foundUser.email };
        setUser(userSession);
        await AsyncStorage.setItem('user_session', JSON.stringify(userSession));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (e) {
      console.log('Login error', e);
      return { success: false, error: 'An error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      const storedUsers = await AsyncStorage.getItem('users_db');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      if (users.find(u => u.email === email)) {
        return { success: false, error: 'User already exists' };
      }

      const newUser = { name, email, password };
      users.push(newUser);

      await AsyncStorage.setItem('users_db', JSON.stringify(users));
      
      // Auto login after signup
      const userSession = { name, email };
      setUser(userSession);
      await AsyncStorage.setItem('user_session', JSON.stringify(userSession));
      
      return { success: true };
    } catch (e) {
      console.log('Signup error', e);
      return { success: false, error: 'An error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      await AsyncStorage.removeItem('user_session');
    } catch (e) {
      console.log('Logout error', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
