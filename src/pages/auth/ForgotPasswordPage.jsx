import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import toast from 'react-hot-toast';
import authService from '../../services/authService.js';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Vui lòng nhập email của bạn.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(email);

      toast.success(response.message || 'Vui lòng kiểm tra email để nhận mã xác thực');
      // Store email in session for use in verify code page
      sessionStorage.setItem('resetEmail', email);
      navigate('/verify-code', { state: { email } });
    } catch (err) {
      console.error('Forgot password error:', err);
      const message = err.response?.data?.message || err.message || 'Không thể gửi email. Vui lòng thử lại.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Nút Quay lại */}
      <Link to="/login" className="inline-flex items-center gap-2 text-text-secondary font-medium mb-6 hover:text-text-primary">
        <FiChevronLeft />
        Back to login
      </Link>

      {/* Header */}
      <h2 className="text-4xl font-bold text-text-primary mb-2">Forgot your password?</h2>
      <p className="text-text-secondary mb-8">Don't worry, happens to all of us. Enter your email below to recover your password.</p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          id="email"
          label="Email"
          placeholder="john.doe@gmail.com"
          value={email}
          onChange={setEmail}
          disabled={isLoading}
          className="mb-6"
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Spinner size="sm" className="mx-auto" /> : 'Gửi mã xác thực'}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
