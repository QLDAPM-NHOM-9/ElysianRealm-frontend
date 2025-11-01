import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  isIconOnly = false, // <-- THÊM PROP NÀY
  className = '', 
  ...props 
}) => {
  
  // 1. Thêm 'flex', 'items-center'. Xóa padding khỏi base.
  const baseStyle = "justify-center flex items-center rounded-lg font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  // 2. Quyết định padding VÀ căn chỉnh dựa trên prop
  const dynamicStyle = isIconOnly 
    ? 'p-0 justify-center' // Nếu là icon, không padding và căn giữa
    : 'px-6 py-3'; // Nếu là nút thường, có padding

  // Định nghĩa các biến thể
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-opacity-90 focus:ring-brand-primary',
    secondary: 'bg-brand-pale text-brand-primary hover:bg-opacity-80 focus:ring-brand-primary',
    outline: 'bg-transparent border border-border-primary text-text-secondary hover:bg-gray-50 focus:ring-brand-primary',
  };

  return (
    <button
      // 3. Áp dụng style mới
      className={`${baseStyle} ${dynamicStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;