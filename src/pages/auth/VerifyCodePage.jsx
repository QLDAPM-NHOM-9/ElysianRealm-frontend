import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiEye } from 'react-icons/fi';

const VerifyCodePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic xác thực code...
    // Nếu đúng, điều hướng đến trang Reset Password
    navigate('/reset-password');
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
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="code">
            Enter Code
          </label>
          <div className="relative">
            <input
              type="text"
              id="code"
              placeholder="7789BM6X"
              className="w-full px-4 py-3 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              defaultValue="7789BM6X"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary"
            >
              <FiEye />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold shadow-md hover:bg-opacity-90 transition-all"
        >
          Verify
        </button>
      </form>

      {/* Link Resend */}
      <p className="text-center text-sm text-text-secondary mt-8">
        Didn't receive a code? 
        <Link to="#" className="text-brand-primary font-medium hover:underline ml-1">
          Resend
        </Link>
      </p>
    </div>
  );
};

export default VerifyCodePage;