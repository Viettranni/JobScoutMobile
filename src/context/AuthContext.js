import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://192.168.0.108:4000/api";

  // Save token to Secure Storage
  const saveTokenToSecureStorage = async (token) => {
    try {
      await SecureStore.setItemAsync("authToken", token);
    } catch (error) {
      console.error("Failed to save token to SecureStore:", error);
    }
  };

  // Retrieve token from Secure Storage
  const getTokenFromSecureStorage = async () => {
    try {
      return await SecureStore.getItemAsync("authToken");
    } catch (error) {
      console.error("Failed to get token from SecureStore:", error);
      return null;
    }
  };

  // Remove token from Secure Storage
  const removeTokenFromSecureStorage = async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");
    } catch (error) {
      console.error("Failed to remove token from SecureStore:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });
      const { token, user } = response.data;

      // Save token securely
      await saveTokenToSecureStorage(token);

      // Update state
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };

  const register = async (email, password, firstname, lastname) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, {
        email,
        password,
        firstname,
        lastname,
      });
      const { token, newUser } = response.data;

      // Save token securely
      await saveTokenToSecureStorage(token);

      // Update state
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };

  const logout = async () => {
    await removeTokenFromSecureStorage();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check authentication status on app load
  const checkAuth = async () => {
    try {
      const token = await getTokenFromSecureStorage();  // Get token from secure storage
  
      // If no token is found, set authentication to false
      if (!token) {
        setIsAuthenticated(false);
        console.log("User is not authenticated");
        return;
      }
  
      // If a token is found, consider the user authenticated
      console.log("User is authenticated!")
      setIsAuthenticated(true);
    } catch (error) {
      console.error(
        "Authentication check failed:",
        error.response?.data?.message || error.message
      );
      setIsAuthenticated(false);  // Set authentication to false in case of error
    } finally {
      setLoading(false);  // Stop loading state
    }
  };  

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading, checkAuth, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
