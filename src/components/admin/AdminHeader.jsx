import React from 'react';
import { FiSearch, FiBell, FiLogOut } from 'react-icons/fi';
import Input from '../../components/common/Input.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx'; // Import Auth

const AdminHeader = () => {
  const { user, logout } = useAuth(); // Lấy user

  return (
    <header className="w-full bg-bg-primary py-4 px-6 flex items-center justify-between border-b border-border-primary sticky top-0 z-30">
      
      {/* Search Bar */}
      <div className="w-72">
        <Input
          id="adminSearch"
          icon={<FiSearch />}
          placeholder="Tìm kiếm..."
          className="[&_input]:bg-bg-secondary" 
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <button className="text-text-secondary hover:text-text-primary relative">
          <FiBell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-border-primary mx-2"></div>

        {/* Admin Info */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-text-primary">{user ? user.name : 'Admin'}</p>
            <p className="text-xs text-text-secondary">Administrator</p>
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${user ? user.name : 'Admin'}&background=random`}
            alt="Admin"
            className="w-10 h-10 rounded-full object-cover border-2 border-border-primary"
          />
          
          <button 
            onClick={logout}
            title="Đăng xuất"
            className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-full transition-colors ml-2"
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;