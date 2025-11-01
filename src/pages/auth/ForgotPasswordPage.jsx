import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/auth/SocialLogin.jsx';
import { FiChevronLeft } from 'react-icons/fi';

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
          <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="john.doe@gmail.com"
            className="w-full px-4 py-3 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            defaultValue="john.doe@gmail.com"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold shadow-md hover:bg-opacity-90 transition-all"
        >
          Submit
        </button>
      </form>

      {/* Social Login (từ design) */}
      <SocialLogin />
    </div>
  );
};

export default ForgotPasswordPage;