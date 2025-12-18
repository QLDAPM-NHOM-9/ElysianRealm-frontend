import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { FiUpload, FiHome } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext.jsx';

// Ảnh bìa mẫu
const coverImageUrl = "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
// Avatar mẫu
const avatarUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fDE?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80";

// Component con cho Tab Navigation
const AccountTab = ({ to, children }) => (
  <NavLink
    to={to}
    // 'end' là quan trọng để 'Account' không bị active khi ở 'Account/History'
    end 
    className={({ isActive }) =>
      `py-4 px-1 text-center font-medium border-b-2
      ${isActive 
        ? 'border-brand-primary text-brand-primary' 
        : 'border-transparent text-text-secondary hover:border-gray-300'
      }`
    }
  >
    {children}
  </NavLink>
);

const AccountLayout = () => {
  const { user } = useAuth();
  return (
    <div className="bg-bg-secondary min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* --- Phần Ảnh bìa & Avatar --- */}
        <div className="relative h-48 md:h-64 rounded-b-2xl shadow-sm" style={{ backgroundImage: `url(${coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          
          {/* Nút Home */}
          <Link to="/" className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-text-primary text-sm font-medium py-2 px-3 rounded-lg flex items-center gap-2 shadow-sm hover:bg-white">
            <FiHome />
            Home
          </Link>

          {/* Avatar & Tên */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
              <img src={avatarUrl} alt="John Doe" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary mt-3">{user?.name || 'User'}</h2>
            <p className="text-text-secondary">{user?.email || 'user@example.com'}</p>
          </div>
        </div>

        {/* --- Phần Tab Navigation --- */}
        <div className="bg-bg-primary rounded-2xl shadow-sm mt-20">
          <nav className="flex justify-around border-b border-border-primary">
            <AccountTab to="/account/profile">Account</AccountTab>
            <AccountTab to="/account/history">History</AccountTab>

          </nav>
          
          {/* --- Nội dung của Tab --- */}
          <div className="p-6 md:p-10">
            {/* <Outlet /> sẽ render trang con (AccountProfilePage, v.v.) ở đây */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;