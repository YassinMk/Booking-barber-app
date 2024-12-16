import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Retrieve the auth token or credentials from localStorage
  const authToken = localStorage.getItem("authToken");

  // Decode the token to validate the credentials
  const decodedCredentials = authToken ? atob(authToken) : null; 
  const isAuthenticated = decodedCredentials === `${import.meta.env.VITE_ADMIN_USERNAME}:${import.meta.env.VITE_ADMIN_PASSWORD}`;// "username:password"

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
