// chitri_frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import axios from '../utils/api';
import { toast } from 'react-hot-toast';

// IMPORTANT: AuthContext itself is created and exported here
export const AuthContext = createContext();

// This is the hook for components to use (can be imported directly or via hooks/useAuth.js)
export const useAuth = () => useContext(AuthContext);

// This is the provider component that wraps your application
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // Manage token state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const idToken = await user.getIdToken();
          const response = await axios.post(`/auth/verify-token`, { idToken });
          localStorage.setItem('token', response.data.token);
          setAuthToken(response.data.token); // Set token state
          setUserRole(response.data.role);
        } catch (error) {
          console.error("Error verifying token or fetching role:", error);
          toast.error("Failed to authenticate user role.");
          setCurrentUser(null);
          setAuthToken(null); // Clear token state
          setUserRole(null);
          localStorage.removeItem('token');
        }
      } else {
        setCurrentUser(null);
        setAuthToken(null); // Clear token state
        setUserRole(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setAuthToken(null); // Clear token state
      setUserRole(null);
      localStorage.removeItem('token');
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out.");
    }
  };

  const value = {
    currentUser,
    userRole,
    loading,
    logout,
    authToken, // Export authToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// REMOVED: The duplicate 'export { AuthContext };' line here
