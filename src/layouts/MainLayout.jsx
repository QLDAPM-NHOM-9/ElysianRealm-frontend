import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/global/Header.jsx';
import Footer from '../components/global/Footer.jsx';
import ChatSupport from '../components/common/ChatSupport.jsx';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-secondary">
      <Header />

      <main className="flex-grow">
        {/* Outlet sẽ render HomePage (hoặc các trang khác) ở đây */}
        <Outlet />
      </main>

      <Footer />

      {/* AI Chat Support - Available on all pages */}
      <ChatSupport />
    </div>
  );
};

export default MainLayout;
