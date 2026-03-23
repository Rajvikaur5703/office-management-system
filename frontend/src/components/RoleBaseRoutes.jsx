import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // 1. If no token, kick them to login
  if (!token) {
    return <Navigate to="/" />;
  }

  // 2. If they have the wrong role (e.g. Employee trying to see Admin), kick them out
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/employee/dashboard'} />;
  }

  return children;
};

export default RoleBaseRoutes;