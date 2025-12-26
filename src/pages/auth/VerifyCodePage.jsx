import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import toast from 'react-hot-toast';

const VerifyCodePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || sessionStorage.getItem('resetEmail') || '';

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!code) {
      setError('Vui lòng nhập mã xác thực.');
      return;
    }

    if (code.length < 6) {
      setError('Mã xác thực phải có ít nhất 6 ký tự.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Call backend API to verify code
      // const response = await authService.verifyResetCode(email, code);
      
      // For now, simulate API call - accept any 6+ digit code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Mã xác thực đúng! Vui lòng đặt mật khẩu mới.');
      // Store verified email for reset password page
      sessionStorage.setItem('verifiedEmail', email);
      navigate('/reset-password', { state: { email, code } });
    } catch (err) {
      const message = err.message || 'Mã xác thực không đúng hoặc đã hết hạn.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError('Email không tìm thấy. Vui lòng quay lại trang trước.');
      return;
    }

    setResendLoading(true);
    try {
      // TODO: Call backend API to resend verification code
      // const response = await authService.resendResetCode(email);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Mã xác thực mới đã được gửi đến email của bạn.');
    } catch (err) {
      const message = err.message || 'Không thể gửi lại mã. Vui lòng thử lại.';
      setError(message);
      toast.error(message);
    } finally {
      setResendLoading(false);
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
      <h2 className="text-4xl font-bold text-text-primary mb-2">Verify code</h2>
      <p className="text-text-secondary mb-8">An authentication code has been sent to your email.</p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="code"
          label="Mã xác thực"
          placeholder="Nhập 6 ký tự từ email"
          value={code}
          onChange={setCode}
          disabled={isLoading}
          className="mb-6"
          maxLength="10"
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <Button type="submit" className="w-full mb-4" disabled={isLoading}>
          {isLoading ? <Spinner size="sm" className="mx-auto" /> : 'Xác thực'}
        </Button>
      </form>

      {/* Link Resend */}
      <p className="text-center text-sm text-text-secondary mt-8">
        Không nhận được mã?
        <button
          type="button"
          onClick={handleResendCode}
          disabled={resendLoading}
          className="text-brand-primary font-medium hover:underline ml-1 disabled:opacity-50"
        >
          {resendLoading ? 'Đang gửi...' : 'Gửi lại'}
        </button>
      </p>
    </div>
  );
};

export default VerifyCodePage;
