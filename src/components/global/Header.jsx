import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiUser, FiSearch, FiMapPin, FiLogOut } from 'react-icons/fi';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import logoIcon from '../../assets/icons/Elysia.png';
import logoText from '../../assets/icons/Elysian.png';
import Input from '../common/Input.jsx'; 
import Button from '../common/Button.jsx'; 
import { useAuth } from '../../contexts/AuthContext.jsx'; 

// Component con: Logo
const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <img src={logoIcon} alt="Elysian Realm Logo" className="w-15 h-15 rounded-full object-cover" />
    <img src={logoText} alt="Elysian Realm" className="h-15" />
  </Link>
);

// Component con: Nút Tab (dùng nội bộ)
// (Phiên bản này là phiên bản "đổi màu", không phải "trượt")
const TabButton = ({ label, icon, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
      ${isActive 
        ? 'bg-brand-primary text-white shadow-sm' 
        : 'text-text-secondary hover:bg-gray-200'
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Header = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [searchQuery, setSearchQuery] = useState(''); // State đã có
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

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

        {/* Thanh tìm kiếm (Giữa) */}
        <form 
          onSubmit={handleSearch} 
          className="flex-1 max-w-2xl flex items-center gap-4"
        >
          {/* Tabs: Flights / Stays */}
          <div className="flex justify-center gap-2 p-1 bg-gray-100 rounded-full">
            <TabButton
              label="Chuyến bay" // <-- Đã Việt hóa
              icon={<IoPaperPlaneOutline />}
              isActive={activeTab === 'flights'}
              onClick={() => setActiveTab('flights')}
            />
            <TabButton
              label="Khách sạn" // <-- Đã Việt hóa
              icon={<FiMapPin />}
              isActive={activeTab === 'stays'}
              onClick={() => setActiveTab('stays')}
            />
          </div>
          
          {/* Search Input và Nút */}
          <div className="relative flex-1">
            <Input
              id="headerSearch"
              placeholder={activeTab === 'flights' ? 'Tìm chuyến bay...' : 'Tìm khách sạn...'}
              // --- CẬP NHẬT LOGIC TẠI ĐÂY ---
              value={searchQuery} // <-- Kết nối value
              onChange={(e) => setSearchQuery(e.target.value)} // <-- Thêm onChange
              // --- HẾT CẬP NHẬT ---
              icon={<FiSearch />}
              className="[&_input]:rounded-full [&_input]:bg-bg-secondary"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary text-white rounded-full h-9 w-20 font-semibold text-sm hover:bg-opacity-90 transition-colors"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
        
        {/* User Actions (Bên phải) */}
        <div className="flex-shrink-0 flex items-center gap-4">
          {user ? (
            <>
              <Link to="/favourites" className="flex items-center gap-2 text-text-secondary hover:text-text-primary">
                <FiHeart className="text-xl" />
                <span className="text-sm font-medium hidden lg:block">Yêu thích</span>
              </Link>
              <Link 
                to="/account/profile" 
                className="flex items-center gap-2 pl-4 border-l border-border-primary"
              >
                <img 
                  src="https://via.placeholder.com/32"
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-text-primary hidden lg:block">{user.name}</span>
              </Link>
              <button
                onClick={logout}
                title="Đăng xuất"
                className="text-text-secondary hover:text-brand-primary"
              >
                <FiLogOut className="text-xl" />
              </button>
            </>
          ) : (
            <Button 
              variant="primary" 
              className="py-2 px-5"
              onClick={() => navigate('/login')}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;