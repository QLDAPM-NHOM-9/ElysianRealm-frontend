import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import Checkbox from '../../components/common/Checkbox.jsx';
import Spinner from '../../components/common/Spinner.jsx';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call API to login
      const response = await login(email, password);
      const user = response.user;

      // Check if there's a redirect location from the state
      const from = location.state?.from;
      const tour = location.state?.tour;

      // Redirect based on role or back to the original page
      if (user.role === 'ADMIN' || user.role === 'admin') {
        navigate('/admin');
      } else if (from && tour) {
        // Redirect back to booking page with tour data
        navigate(from, { state: { tour }, replace: true });
      } else if (from) {
        // Redirect back to the original page
        navigate(from, { replace: true });
      } else {
        navigate('/account/profile');
      }
    } catch (err) {
      const message =
        err.message ||
        'Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <h2 className="text-4xl font-bold text-text-primary mb-2">Đăng nhập</h2>
      <p className="text-text-secondary mb-8">
        Đăng nhập để truy cập tài khoản Elysian Realm của bạn
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Nhập email"
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
          disabled={isLoading}
          className="mb-6"
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

        <div className="flex justify-between items-center mb-6">
          <Checkbox id="remember" label="Ghi nhớ tài khoản" disabled={isLoading} />
          <Link to="/forgot-password" className="text-sm text-brand-primary font-medium hover:underline">
            Quên mật khẩu?
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" className="mx-auto" /> : 'Đăng nhập'}
        </Button>
      </form>

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
