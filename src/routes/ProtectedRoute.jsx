import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Forbidden from '../Pages/Forbidden';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, token } = useUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Forbidden />;
  }

  return children;
};

export default ProtectedRoute;
