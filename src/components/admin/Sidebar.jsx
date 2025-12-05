import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiUsers, FiPackage, FiSend, FiCompass, FiLogOut } from 'react-icons/fi';
import logoIcon from '../../assets/icons/Elysia.png';
import { useAuth } from '../../contexts/AuthContext.jsx'; // <-- 1. Import Auth

// Component con cho Logo
const Logo = () => (
  <Link to="/" className="flex items-center gap-2 px-4">
    <img src={logoIcon} alt="Elysian Realm Logo" className="w-10 h-10 rounded-full object-cover" />
    <span className="text-xl font-bold text-text-primary font-brand">Elysian Realm</span>
  </Link>
);

// Component con cho NavLink
const NavItem = ({ to, icon, children }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
      ${isActive
        ? 'bg-brand-pale text-brand-primary' 
        : 'text-text-secondary hover:bg-gray-100'
      }`
    }
  >
    {icon}
    <span>{children}</span>
  </NavLink>
);

const Sidebar = () => {
  const { logout } = useAuth(); // <-- 2. Lấy hàm logout
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Nếu có Backend thật, bạn có thể gọi API logout ở đây
    // authApi.logout(); 
    
    // Xóa state và token
    logout(); 
    localStorage.removeItem('token'); // Xóa token nếu bạn đã lưu
    navigate('/login');
  };

  return (
    <aside className="w-64 h-screen bg-bg-primary border-r border-border-primary flex flex-col sticky top-0">
      <div className="py-6">
        <Logo />
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <NavItem to="/admin" icon={<FiGrid />}>Dashboard</NavItem>
        <NavItem to="/admin/users" icon={<FiUsers />}>Users</NavItem>
        <NavItem to="/admin/bookings" icon={<FiPackage />}>Bookings</NavItem>
        <NavItem to="/admin/flights" icon={<FiSend />}>Flights</NavItem>
        <NavItem to="/admin/tours" icon={<FiCompass />}>Tours</NavItem>
      </nav>

      <div className="p-4 border-t border-border-primary">
        {/* 3. SỬA NÚT LOGOUT: Dùng button onClick thay vì NavItem */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-text-secondary hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;