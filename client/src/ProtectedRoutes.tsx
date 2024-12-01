import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const isLoggedIn = Boolean(localStorage.getItem('userId')); 

  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  
  return <Outlet />;
};

export default ProtectedRoute;
