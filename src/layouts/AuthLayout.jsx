import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthHeader from '../components/auth/AuthHeader.jsx';

// Ảnh nền bên phải (Bạn có thể thay đổi)
const authImageUrl = "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1065&q=80";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary p-4 relative">
       {/*<AuthHeader />*/}
      
      <div className="w-full max-w-6xl flex bg-bg-primary rounded-2xl shadow-xl overflow-hidden">
        
        {/* Cột trái: Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-16">
          {/* <Outlet /> sẽ render LoginPage hoặc RegisterPage ở đây */}
          <Outlet />
        </div>

        {/* Cột phải: Ảnh (Ẩn trên thiết bị nhỏ) */}
        <div className="hidden lg:block lg:w-1/2">
          <img 
            src={authImageUrl} 
            alt="Travel" 
            className="w-full h-full object-cover" 
          />
          {/* Bạn có thể thêm các dấu chấm ... ở đây nếu muốn */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;