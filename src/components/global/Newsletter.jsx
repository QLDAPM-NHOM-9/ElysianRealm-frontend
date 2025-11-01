import React from 'react';
import { FiSend } from 'react-icons/fi'; // Icon máy bay giấy

const Newsletter = () => {
  return (
    // Đổi nền sang màu hồng nhạt mới
    <div className="bg-brand-pale rounded-2xl p-8 md:p-12 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        
        {/* Phần chữ */}
        <div className="lg:w-1/2 z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Subscribe Newsletter
          </h2>
          <p className="text-lg text-text-primary font-semibold mb-2">The Travel</p>
          <p className="text-text-secondary mb-6">
            Get inspired! Receive travel discounts, tips and behind the scenes stories.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              // Đổi màu focus ring
              className="flex-grow p-4 border border-border-primary rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <button
              type="submit"
              className="bg-text-primary text-white p-4 rounded-r-md font-semibold hover:bg-opacity-90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Phần ảnh hòm thư (Đổi màu cho hợp) */}
        <div className="w-full lg:w-1/3 flex justify-center z-10">
          <div className="w-64 h-64 relative">
            <div className="w-full h-40 bg-text-primary rounded-t-lg shadow-lg" />
            <div className="w-full h-24 bg-text-secondary shadow-lg" />
            <div className="absolute -top-4 -right-4 w-32 h-16 bg-brand-secondary rounded-md transform rotate-12 shadow-xl border-4 border-white">
              <FiSend className="text-white text-4xl m-auto mt-3" />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-32 bg-yellow-700" /> {/* Giữ màu cột */}
          </div>
        </div>
        
        {/* Nền trang trí (Đổi sang màu hồng/tím) */}
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-brand-primary/20 rounded-full" />
      </div>
    </div>
  );
};

export default Newsletter;