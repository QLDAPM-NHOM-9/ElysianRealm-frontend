import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiUser, FiSearch, FiMapPin } from 'react-icons/fi';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import logoIcon from '../../assets/icons/Elysia.png';
import Input from '../common/Input.jsx'; 

// Component con: Logo
const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <img src={logoIcon} alt="Elysian Realm Logo" className="w-15 h-15 rounded-full object-cover" />
    <span className="text-2xl font-bold text-text-primary">Elysian Realm</span>
  </Link>
);

// Component con: Nút Tab (dùng nội bộ)
const TabButton = ({ label, icon, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
      ${isActive 
        ? 'bg-brand-primary text-white shadow-sm' // <-- THAY ĐỔI: Thành màu đậm + chữ trắng
        : 'text-text-secondary hover:bg-gray-200' // <-- Đổi hover
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Header = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Hàm xử lý khi nhấn nút Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; 

    if (activeTab === 'flights') {
      navigate(`/flight-listing?q=${searchQuery}`);
    } else {
      navigate(`/hotel-listing?q=${searchQuery}`);
    }
  };

  return (
    <header className="bg-bg-primary sticky top-0 z-50 shadow-xs">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
        
        {/* Logo (Bên trái) */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Thanh tìm kiếm (Giữa) - ĐÃ CẬP NHẬT */}
        <form 
          onSubmit={handleSearch} 
          // 1. Thêm flex, items-center, gap-4
          className="flex-1 max-w-2xl flex items-center gap-4"
        >
          <div className="flex justify-center gap-2 p-1 bg-gray-100 rounded-full">
            <TabButton
              label="Flights"
              icon={<IoPaperPlaneOutline />}
              isActive={activeTab === 'flights'}
              onClick={() => setActiveTab('flights')}
            />
            <TabButton
              label="Stays"
              icon={<FiMapPin />}
              isActive={activeTab === 'stays'}
              onClick={() => setActiveTab('stays')}
            />
          </div>
          
          {/* Search Input và Nút */}
          {/* 3. Thêm flex-1 để nó lấp đầy không gian */}
          <div className="relative flex-1">
            <Input
              id="headerSearch"
              placeholder={activeTab === 'flights' ? 'Search flights...' : 'Search stays...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<FiSearch />}
              className="[&_input]:rounded-full [&_input]:bg-bg-secondary"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary text-white rounded-full h-9 w-20 font-semibold text-sm hover:bg-opacity-90 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
        
        {/* User Actions (Bên phải) */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <Link to="/favourites" className="flex items-center gap-2 text-text-secondary hover:text-text-primary">
            <FiHeart className="text-xl" />
            <span className="text-sm font-medium hidden lg:block">Favourites</span>
          </Link>
          <Link 
            to="/account/profile" 
            className="flex items-center gap-2 pl-4 border-l border-border-primary"
          >
            <img 
              src="https://via.placeholder.com/32"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-text-primary hidden lg:block">John D.</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;