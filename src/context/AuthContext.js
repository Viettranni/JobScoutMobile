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

      // Save token to local storage or secure storage (in mobile apps)
      localStorage.setItem("authToken", token);

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

  const logout = async () => {
    await removeTokenFromSecureStorage();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check authentication status on app load
  const checkAuth = async () => {
    try {
      const token = await getTokenFromSecureStorage();

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      // Fetch profile and favorites simultaneously
      const [profileResponse, favouritesResponse, appliedJobsResponse] =
        await Promise.all([
          axios.get(`${BASE_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/favourites`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/appliedJobs`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

      console.log("Profile:", profileResponse.data);
      console.log("Favourites:", favouritesResponse.data);
      console.log("Applied Jobs:", appliedJobsResponse.data);

      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(
        "Authentication check failed:",
        error.response?.data?.message || error.message
      );
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
