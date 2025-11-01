import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/auth/SocialLogin.jsx';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import Checkbox from '../../components/common/Checkbox.jsx';
import Spinner from '../../components/common/Spinner.jsx';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // --- 1. SỬ DỤNG useState ĐỂ KIỂM SOÁT FORM ---
  // (Giả lập dữ liệu đã điền sẵn từ design)
  const [email, setEmail] = useState('john.doe@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);
  
  // --- 2. QUẢN LÝ TRẠNG THÁI LOGIC ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // Để lưu thông báo lỗi

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return; // Ngăn double-click

    setError(''); // Xóa lỗi cũ
    setIsLoading(true); // Bắt đầu loading

    // --- 3. GIẢ LẬP VIỆC GỌI API (MOCK API CALL) ---
    setTimeout(() => {
      setIsLoading(false); // Kết thúc loading
      
      // Giả lập logic xác thực
      if (email === 'john.doe@gmail.com' && password === '12345678') {
        // ĐÚNG: Gọi login từ Context và điều hướng
        login();
        navigate('/account/profile');
      } else {
        // SAI: Hiển thị lỗi
        setError('Invalid email or password. Please try again.');
      }
    }, 1500); // Giả lập 1.5 giây chờ mạng
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <h2 className="text-4xl font-bold text-text-primary mb-2">Đăng nhập</h2>
      <p className="text-text-secondary mb-8">Đăng nhập để truy cập tài khoản Elysian Realm của bạn</p>

      {/* Form */}
<form onSubmit={handleSubmit}>
        
        {/* --- 4. KẾT NỐI INPUT VỚI STATE --- */}
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Nhập email"
          value={email} // <-- Dùng value
          onChange={(e) => setEmail(e.target.value)} // <-- Dùng onChange
          className="mb-4"
          disabled={isLoading}
        />

        <Input
          id="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="mb-6" // Chuyển mb-6 vào đây
          // Truyền nút "con mắt" vào prop iconRight
          iconRight={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-text-secondary" // Bỏ hết các class căn chỉnh
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          }
        />
        {/* Xóa <div> và <button> bên ngoài đã bao bọc Input */}
        
        <div className="flex justify-between items-center mb-6">
          <Checkbox id="remember" label="Ghi nhớ tài khoản" disabled={isLoading} />
          <Link to="/forgot-password" className="text-sm text-brand-primary font-medium hover:underline">
            Quên mật khẩu?
          </Link>
        </div>

        {/* --- 5. HIỂN THỊ LỖI (NẾU CÓ) --- */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* --- 6. HIỂN THỊ SPINNER TRONG NÚT --- */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" className="mx-auto" /> : 'Đăng nhập'}
        </Button>
      </form>

      {/* Social Login */}
      <SocialLogin />

      {/* Link to Register */}
      <p className="text-center text-sm text-text-secondary mt-8">
        Chưa có tài khoản? 
        <Link to="/register" className="text-brand-primary font-medium hover:underline ml-1">
          Đăng ký
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;