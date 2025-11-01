import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar.jsx';
import AdminHeader from '../components/admin/AdminHeader.jsx';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-bg-secondary">
      {/* Sidebar cố định */}
      <Sidebar />

      {/* Khu vực nội dung (cuộn được) */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        {/* Nội dung trang chính */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;