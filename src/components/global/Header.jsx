import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHeart, FiUser, FiSearch, FiCompass, FiLogOut } from 'react-icons/fi'; // Dùng FiCompass cho Tour
import { IoPaperPlaneOutline } from 'react-icons/io5';
import logoIcon from '../../assets/icons/Elysia.png'; 
import logoText from '../../assets/icons/Elysian.png';
import Input from '../common/Input.jsx'; 
import Button from '../common/Button.jsx'; 
import { useAuth } from '../../contexts/AuthContext.jsx'; 

const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <img src={logoIcon} alt="Logo" className="w-15 h-15 rounded-full object-cover" />
    <img src={logoText} alt="Elysian Realm" className="h-12" />
  </Link>
);

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
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Auto-detect active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/tour') || path.includes('/tour-')) {
      setActiveTab('tours');
    } else if (path.includes('/flight') || path.includes('/flight-')) {
      setActiveTab('flights');
    }
    // Otherwise keep current tab
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();

    // Always navigate to listing page, even with empty search
    // If search query is empty, show all results
    const searchParam = searchQuery.trim() ? `?q=${searchQuery}` : '';

    if (activeTab === 'flights') {
      navigate(`/flight-listing${searchParam}`);
    } else {
      // --- CẬP NHẬT LOGIC TOUR ---
      navigate(`/tour-listing${searchParam}`);
    }
  };

  return (
    <header className="bg-bg-primary sticky top-0 z-50 shadow-xs">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Thanh tìm kiếm */}
        <form 
          onSubmit={handleSearch} 
          className="flex-1 max-w-2xl flex items-center gap-4"
        >
          {/* Tabs: Flights / Tours */}
          <div className="flex justify-center gap-2 p-1 bg-gray-100 rounded-full">
            <TabButton
              label="Chuyến bay"
              icon={<IoPaperPlaneOutline />}
              isActive={activeTab === 'flights'}
              onClick={() => setActiveTab('flights')}
            />
            {/* --- TAB TOUR --- */}
            <TabButton
              label="Tours"
              icon={<FiCompass />}
              isActive={activeTab === 'tours'} // Đổi state check thành 'tours'
              onClick={() => setActiveTab('tours')}
            />
          </div>
          
          {/* Input */}
          <div className="relative flex-1">
            <Input
              id="headerSearch"
              placeholder={activeTab === 'flights' ? 'Tìm chuyến bay...' : 'Tìm tour du lịch...'}
              value={searchQuery}
              onChange={setSearchQuery}
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

        {/* User Actions */}
        <div className="flex-shrink-0 flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/favourites"
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary"
              >
                <FiHeart className="text-xl" />
                <span className="text-sm font-medium hidden lg:block">Yêu thích</span>
              </Link>
              <Link
                to="/account/profile"
                className="flex items-center gap-2 pl-4 border-l border-border-primary hover:opacity-80"
              >
                <img
                  src="https://via.placeholder.com/32"
                  alt={user.name || user.email}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-text-primary hidden lg:block">
                  {user.name || user.email}
                </span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                title="Đăng xuất"
                className="text-text-secondary hover:text-brand-primary transition-colors"
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
