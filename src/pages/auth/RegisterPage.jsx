import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import Checkbox from '../../components/common/Checkbox.jsx';
import Spinner from '../../components/common/Spinner.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Validation
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

    setError('');
    setIsLoading(true);

    try {
      const response = await register({
        name: `${lastName} ${firstName}`,
        email,
        password,
      });

      // Navigate to payment or login
      navigate('/login');
    } catch (err) {
      const message = err.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <h2 className="text-4xl font-bold text-text-primary mb-2">Đăng ký</h2>
      <p className="text-text-secondary mb-8">Hãy tạo tài khoản để truy cập vào Elysian Realm.</p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input
            id="lastName"
            label="Họ"
            placeholder="Nguyễn"
            value={lastName}
            onChange={setLastName}
            className="w-full sm:w-1/2"
            disabled={isLoading}
            required
          />
          <Input
            id="firstName"
            label="Tên"
            placeholder="Văn"
            value={firstName}
            onChange={setFirstName}
            className="w-full sm:w-1/2"
            disabled={isLoading}
            required
          />
        </div>

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="nguyen.van@gmail.com"
          value={email}
          onChange={setEmail}
          className="mb-4"
          disabled={isLoading}
          required
        />

        <Input
          id="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          className="mb-4"
          disabled={isLoading}
          required
          iconRight={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-text-secondary"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          }
        />

        <Input
          id="confirmPassword"
          label="Xác nhận Mật khẩu"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={confirmPassword}
          onChange={setConfirmPassword}
          className="mb-6"
          disabled={isLoading}
          required
          iconRight={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-text-secondary"
            >
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
            <span className="flex flex-wrap items-center">
              <span className="mr-1">Tôi đồng ý với</span>
              <Link to="#" className="text-brand-primary font-medium hover:underline mr-1">
                Điều khoản
              </Link>
              <span className="mr-1">và</span>
              <Link to="#" className="text-brand-primary font-medium hover:underline">
                Chính sách Bảo mật
              </Link>
            </span>
          }
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Spinner size="sm" className="mx-auto" /> : 'Tạo tài khoản'}
        </Button>
      </form>

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
