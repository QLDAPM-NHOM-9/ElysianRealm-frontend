import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import toast from 'react-hot-toast';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || sessionStorage.getItem('verifiedEmail') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Vui lòng nhập mật khẩu mới.');
      return;
    }

    if (password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp. Vui lòng kiểm tra lại.');
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setError('Mật khẩu phải chứa ít nhất 1 chữ in hoa, 1 chữ thường và 1 số.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Call backend API to reset password
      // const response = await authService.resetPassword(email, password);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Mật khẩu đã được đặt lại thành công!');
      // Clear session storage
      sessionStorage.removeItem('resetEmail');
      sessionStorage.removeItem('verifiedEmail');
      navigate('/login');
    } catch (err) {
      const message = err.message || 'Không thể đặt lại mật khẩu. Vui lòng thử lại.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <h2 className="text-4xl font-bold text-text-primary mb-2">Đặt mật khẩu mới</h2>
      <p className="text-text-secondary mb-8">Mật khẩu cũ của bạn đã được đặt lại. Vui lòng đặt mật khẩu mới cho tài khoản của bạn.</p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          id="password"
          label="Mật khẩu mới"
          placeholder="Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số"
          value={password}
          onChange={setPassword}
          disabled={isLoading}
          className="mb-6"
          required
        />

        <Input
          type="password"
          id="confirmPassword"
          label="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={setConfirmPassword}
          disabled={isLoading}
          className="mb-6"
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Spinner size="sm" className="mx-auto" /> : 'Đặt mật khẩu'}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;