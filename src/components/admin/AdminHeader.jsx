import React from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';
import Input from '../../components/common/Input.jsx'; // <-- IMPORT

const AdminHeader = () => {
  return (
    <header className="w-full bg-bg-primary py-4 px-6 flex items-center justify-between border-b border-border-primary sticky top-0 z-30">
      
      {/* Search Bar (ĐÃ REFACTOR) */}
      <div className="w-72">
        <Input
          id="adminSearch"
          icon={<FiSearch />}
          placeholder="Search..."
          // Ghi đè style một chút
          className="[&_input]:bg-bg-secondary" 
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <button className="text-text-secondary hover:text-text-primary">
          <FiBell className="w-6 h-6" />
        </button>
        <img
          src="https://via.placeholder.com/40"
          alt="Admin"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </header>
  );
};

export default AdminHeader;