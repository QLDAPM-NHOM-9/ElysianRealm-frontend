import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiGrid, FiUsers, FiPackage, FiSend, FiHome, FiLogOut } from 'react-icons/fi';
import logoIcon from '../../assets/icons/Elysia.png';

// Component con cho Logo
const Logo = () => (
  <Link to="/" className="flex items-center gap-2 px-4">
    <img src={logoIcon} alt="Elysian Realm Logo" className="w-10 h-10 rounded-full object-cover" />
    <span className="text-xl font-bold text-text-primary">Elysian Realm</span>
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
        ? 'bg-brand-pale text-brand-primary' // Nền hồng nhạt, chữ tím/hồng
        : 'text-text-secondary hover:bg-gray-100'
      }`
    }
  >
    {icon}
    <span>{children}</span>
  </NavLink>
);

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-bg-primary border-r border-border-primary flex flex-col sticky top-0">
      {/* Logo */}
      <div className="py-6">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <NavItem to="/admin" icon={<FiGrid />}>Dashboard</NavItem>
        <NavItem to="/admin/users" icon={<FiUsers />}>Users</NavItem>
        <NavItem to="/admin/bookings" icon={<FiPackage />}>Bookings</NavItem>
        <NavItem to="/admin/flights" icon={<FiSend />}>Flights</NavItem>
        <NavItem to="/admin/hotels" icon={<FiHome />}>Hotels</NavItem>
        {/* Thêm các link khác ở đây */}
      </nav>

      {/* Footer Sidebar (Logout) */}
      <div className="p-4 border-t border-border-primary">
        <NavItem to="/login" icon={<FiLogOut />}>Logout</NavItem>
      </div>
    </aside>
  );
};

export default Sidebar;