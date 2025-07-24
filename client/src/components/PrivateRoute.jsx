// Location: client/src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { userInfo, loading } = useAuth();

  // While the auth state is being checked, don't render anything to avoid a flicker
  if (loading) {
    return null; 
  }

  // If the user is not logged in, redirect them to the login page
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the component they were trying to access
  return children;
}
