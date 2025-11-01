import React from 'react';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Button from '../common/Button.jsx'; // <-- IMPORT

// Xóa component SocialLoginButton

const SocialLogin = () => {
  return (
    <div>
      {/* Vạch "Or login with" */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border-primary" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-bg-primary px-4 text-text-secondary">Hoặc đăng nhập với</span>
        </div>
      </div>

      {/* Các nút (ĐÃ REFACTOR) */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          className="flex-1 flex flex-col items-center justify-center gap-2 py-4"
        >
          <FaFacebookF className="text-blue-600 text-2xl" />
          <span>Facebook</span>
        </Button>

        <Button
          variant="outline"
          className="flex-1 flex flex-col items-center justify-center gap-2 py-4"
        >
          <FcGoogle className="text-2xl" />
          <span>Google</span>
        </Button>

        <Button
          variant="outline"
          className="flex-1 flex flex-col items-center justify-center gap-2 py-4"
        >
          <FaApple className="text-black text-2xl" />
          <span>Apple</span>
        </Button>
      </div>

    </div>
  );
};

export default SocialLogin;