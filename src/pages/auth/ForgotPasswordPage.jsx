import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/auth/SocialLogin.jsx';
import { FiChevronLeft } from 'react-icons/fi';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic gửi email...
    // Sau khi gửi, điều hướng đến trang Verify Code
    navigate('/verify-code');
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
        <div className="mb-6">
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="john.doe@gmail.com"
            defaultValue="john.doe@gmail.com"
          />
        </div>

        <Button type="submit">
          Submit
        </Button>
      </form>

      {/* Social Login (từ design) */}
      <SocialLogin />
    </div>
  );
};

export default ForgotPasswordPage;
