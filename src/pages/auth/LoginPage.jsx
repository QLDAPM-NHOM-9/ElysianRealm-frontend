import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from '../../components/auth/SocialLogin.jsx';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <h2 className="text-4xl font-bold text-text-primary mb-2">Login</h2>
      <p className="text-text-secondary mb-8">Login to access your Elysian Realm account</p>

      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
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

        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              defaultValue="12345678"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center text-sm text-text-secondary cursor-pointer">
            <input type="checkbox" className="mr-2 rounded border-border-primary text-brand-primary focus:ring-brand-primary" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-sm text-brand-primary font-medium hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold shadow-md hover:bg-opacity-90 transition-all"
        >
          Login
        </button>
      </form>

      {/* Social Login */}
      <SocialLogin />

      {/* Link to Register */}
      <p className="text-center text-sm text-text-secondary mt-8">
        Don't have an account? 
        <Link to="/register" className="text-brand-primary font-medium hover:underline ml-1">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;