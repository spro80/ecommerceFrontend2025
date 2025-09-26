import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.jsx';

export default function RequireAdmin({ children }) {
  const { user, openAuthModal } = useUser();
  const location = useLocation();

  if (!user) {
    // Prompt login and redirect home
    setTimeout(() => openAuthModal?.(), 0);
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}

