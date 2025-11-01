import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from '../../components/auth/SocialLogin.jsx';
import { FiEye, FiEyeOff } from 'react-icons/fi';

// --- IMPORT CÁC COMPONENT COMMON ---
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import Checkbox from '../../components/common/Checkbox.jsx';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <h2 className="text-4xl font-bold text-text-primary mb-2">Sign up</h2>
      <p className="text-text-secondary mb-8">Let's get you all st up so you can access your personal account.</p>

      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()}>
        
        {/* --- DÙNG <Input> --- */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input
            id="firstName" label="First Name" placeholder="John"
            className="w-full sm:w-1/2"
          />
          <Input
            id="lastName" label="Last Name" placeholder="Doe"
            className="w-full sm:w-1/2"
          />
        </div>

        {/* --- DÙNG <Input> --- */}
        <Input
          id="email" label="Email" type="email" placeholder="john.doe@gmail.com"
          className="mb-4"
        />
        
        {/* --- DÙNG <Input> (với icon) --- */}
        <div className="mb-4 relative">
          <Input
            id="password" label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-9 right-4 flex items-center text-text-secondary"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* --- DÙNG <Input> (với icon) --- */}
        <div className="mb-6 relative">
          <Input
            id="confirmPassword" label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-9 right-4 flex items-center text-text-secondary"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* --- DÙNG <Checkbox> (với label phức tạp) --- */}
        <Checkbox
          id="terms"
          className="mb-6"
          label={
            // Chúng ta đặt khoảng trắng bên trong các chuỗi text
            <> 
              {'I agree to all the '}
              <Link to="#" className="text-brand-primary font-medium hover:underline">Terms</Link>
              {' and '}
              <Link to="#" className="text-brand-primary font-medium hover:underline">Privacy Policies</Link>
            </>
          }
        />

        {/* --- DÙNG <Button> --- */}
        <Button
          type="submit"
          className="w-full" // variant="primary" là mặc định
        >
          Create account
        </Button>
      </form>

      {/* Social Login */}
      <SocialLogin />

      {/* Link to Login */}
      <p className="text-center text-sm text-text-secondary mt-8">
        Already have an account? 
        <Link to="/login" className="text-brand-primary font-medium hover:underline ml-1">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;