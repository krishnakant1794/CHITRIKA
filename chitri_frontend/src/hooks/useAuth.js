// chitri_frontend/src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'; // IMPORTANT: Import AuthContext as a NAMED import

// This hook provides access to the AuthContext values
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This error indicates useAuth was called outside of AuthProvider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth; // IMPORTANT: This must be a DEFAULT export
