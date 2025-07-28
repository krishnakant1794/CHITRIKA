// chitri_frontend/src/components/common/ProtectedRoute.jsx
import React, { useEffect } from 'react'; // Import useEffect
import { Navigate, Outlet, useNavigate } from 'react-router-dom'; // Import useNavigate
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, userRole, loading } = useAuth();
  const navigate = useNavigate(); // Get navigate function

  // Handle redirects and toasts inside useEffect
  useEffect(() => {
    if (!loading) { // Only run once authentication state is determined
      if (!currentUser) {
        toast.error("You need to log in to access this page.");
        navigate('/login', { replace: true }); // Use replace to prevent going back to protected route
      } else if (allowedRoles && !allowedRoles.includes(userRole)) {
        toast.error("You are not authorized to access this page.");
        navigate('/', { replace: true }); // Redirect to home or a 403 page
      }
    }
  }, [loading, currentUser, userRole, allowedRoles, navigate]); // Add navigate to dependencies

  if (loading) {
    return <LoadingSpinner message="Authenticating..." />;
  }

  // Only render Outlet if user is authenticated and authorized
  if (currentUser && (!allowedRoles || allowedRoles.includes(userRole))) {
    return <Outlet />;
  }

  // If not loading and not authorized/authenticated, return null as useEffect handles navigation
  return null;
};

export default ProtectedRoute;
