import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiEye } from 'react-icons/fi';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';

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
          <Input
            type="text"
            id="code"
            label="Enter Code"
            placeholder="7789BM6X"
            defaultValue="7789BM6X"
            iconRight={<button type="button" className="text-text-secondary"><FiEye /></button>}
          />
        </div>

        <Button type="submit">
          Verify
        </Button>
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
