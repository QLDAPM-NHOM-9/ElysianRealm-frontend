import React from 'react';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Button from '../common/Button.jsx';
import toast from 'react-hot-toast';

const SocialLogin = () => {
  
  // --- LOGIC BACKEND SẼ NẰM Ở ĐÂY ---
  const handleSocialLogin = (provider) => {
    // Cách 1: Nếu Backend dùng Spring Security OAuth2 Client tiêu chuẩn
    // Bạn chỉ cần chuyển hướng người dùng đến endpoint của Backend
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';
    
    // Ví dụ endpoint chuẩn của Spring Boot: /oauth2/authorization/{provider}
    // window.location.href = `${API_URL.replace('/api/v1', '')}/oauth2/authorization/${provider}`;
    
    // TODO: Implement OAuth2 flow when backend endpoint is ready
    toast.warning(`Tính năng đăng nhập ${provider} sẽ được kết nối với Backend Spring Boot.`);
  };

  return (
    <div>
      {/* Vạch ngăn cách */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border-primary" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-bg-primary px-4 text-text-secondary">Hoặc đăng nhập với</span>
        </div>
      </div>

      {/* Các nút (Sử dụng Grid) */}
      <div className="grid grid-cols-3 gap-4">
        {/* FACEBOOK */}
        <Button 
          variant="outline" 
          className="flex justify-center items-center gap-2 hover:bg-blue-50 hover:border-blue-200"
          onClick={() => handleSocialLogin('facebook')}
          type="button"
        >
          <FaFacebookF className="text-blue-600 text-xl" />
          <span className="hidden sm:inline text-sm font-medium">Facebook</span>
        </Button>

        {/* GOOGLE */}
        <Button 
          variant="outline" 
          className="flex justify-center items-center gap-2 hover:bg-gray-50"
          onClick={() => handleSocialLogin('google')}
          type="button"
        >
          <FcGoogle className="text-xl" />
          <span className="hidden sm:inline text-sm font-medium">Google</span>
        </Button>

        {/* APPLE */}
        <Button 
          variant="outline" 
          className="flex justify-center items-center gap-2 hover:bg-gray-100 hover:border-gray-400"
          onClick={() => handleSocialLogin('apple')}
          type="button"
        >
          <FaApple className="text-black text-xl" />
          <span className="hidden sm:inline text-sm font-medium">Apple</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;
