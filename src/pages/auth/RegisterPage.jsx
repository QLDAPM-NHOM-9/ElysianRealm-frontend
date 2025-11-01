import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/auth/SocialLogin.jsx';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import Checkbox from '../../components/common/Checkbox.jsx';
import Spinner from '../../components/common/Spinner.jsx'; // <-- IMPORT SPINNER
// (Chúng ta chưa dùng useAuth ở đây vì đăng ký là một luồng riêng)

const RegisterPage = () => {
  const navigate = useNavigate();

  // --- 1. SỬ DỤNG useState ĐỂ KIỂM SOÁT FORM ---
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false); // State cho checkbox

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // --- 2. QUẢN LÝ TRẠNG THÁI LOGIC ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // Để lưu thông báo lỗi

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    // --- 3. XÁC THỰC (VALIDATION) CƠ BẢN ---
    if (!firstName || !lastName || !email || !password) {
      setError('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }
    if (!agreed) {
      setError('Bạn phải đồng ý với Điều khoản và Chính sách Bảo mật.');
      return;
    }

    setError(''); // Xóa lỗi cũ
    setIsLoading(true); // Bắt đầu loading

    // --- 4. GIẢ LẬP VIỆC GỌI API ĐĂNG KÝ ---
    setTimeout(() => {
      setIsLoading(false); // Kết thúc loading
      
      // Giả lập thành công:
      // Trong dự án thật, bạn có thể điều hướng đến /register-payment
      // hoặc /login tùy theo luồng của bạn.
      navigate('/register-payment'); 
      
      // Giả lập thất bại (ví dụ: email đã tồn tại):
      // setError('Địa chỉ email này đã được sử dụng.');

    }, 2000); // Giả lập 2 giây chờ mạng
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <h2 className="text-4xl font-bold text-text-primary mb-2">Đăng ký</h2>
      <p className="text-text-secondary mb-8">Hãy tạo tài khoản để truy cập vào Elysian Realm.</p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        
        {/* --- 5. KẾT NỐI INPUT VỚI STATE (Đã Việt hóa) --- */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input
            id="lastName" label="Họ" placeholder="Nguyễn"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full sm:w-1/2"
            disabled={isLoading}
          />
          <Input
            id="firstName" label="Tên" placeholder="Văn"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full sm:w-1/2"
            disabled={isLoading}
          />
        </div>

        <Input
          id="email" label="Email" type="email" placeholder="nguyen.van@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
          disabled={isLoading}
        />
        
        <Input
          id="password" label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
          disabled={isLoading}
          iconRight={
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-text-secondary">
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          }
        />

        <Input
          id="confirmPassword" label="Xác nhận Mật khẩu"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-6"
          disabled={isLoading}
          iconRight={
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-text-secondary">
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          }
        />

<Checkbox
          id="terms"
          className="mb-6"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          disabled={isLoading}
          label={
            // Bọc tất cả trong 1 span flex-wrap và dùng margin `mr-1` (0.25rem)
            <span className="flex flex-wrap items-center">
              <span className="mr-1">Tôi đồng ý với</span>
              <Link to="#" className="text-brand-primary font-medium hover:underline mr-1">Điều khoản</Link>
              <span className="mr-1">và</span>
              <Link to="#" className="text-brand-primary font-medium hover:underline">Chính sách Bảo mật</Link>
            </span>
          }
        />

        {/* Hiển thị lỗi (nếu có) */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Nút Create Account */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" className="mx-auto" /> : 'Tạo tài khoản'}
        </Button>
      </form>

      {/* Social Login */}
      <SocialLogin />

      {/* Link to Login */}
      <p className="text-center text-sm text-text-secondary mt-8">
        Đã có tài khoản? 
        <Link to="/login" className="text-brand-primary font-medium hover:underline ml-1">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;