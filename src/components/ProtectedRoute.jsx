import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// A component that checks if a user is authenticated.
// If the user is authenticated, it renders the child components (the protected page).
// Otherwise, it redirects the user to the login page.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
