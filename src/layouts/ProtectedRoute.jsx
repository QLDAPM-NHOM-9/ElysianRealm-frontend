import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // Nếu chưa đăng nhập, điều hướng về trang /login
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, cho phép truy cập (render <AccountLayout />)
  return <Outlet />;
};

export default ProtectedRoute;