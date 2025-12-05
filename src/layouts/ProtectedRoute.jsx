import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Spinner from '../components/common/Spinner.jsx';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, loading, isAdmin, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated()) {
    // Nếu chưa đăng nhập, điều hướng về trang /login
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    // Nếu yêu cầu admin nhưng user không phải admin, điều hướng về trang chủ
    return <Navigate to="/" replace />;
  }

  // Nếu đã đăng nhập và pass được kiểm tra, cho phép truy cập
  return <Outlet />;
};

export default ProtectedRoute;