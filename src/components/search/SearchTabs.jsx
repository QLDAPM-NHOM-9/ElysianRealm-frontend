import React, { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { IoPaperPlaneOutline } from 'react-icons/io5'; // Dùng icon máy bay giấy
import FlightSearchForm from './FlightSearchForm.jsx';
import HotelSearchForm from './HotelSearchForm.jsx';

const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState('flights'); // 'flights' hoặc 'stays'

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Các nút Tab */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setActiveTab('flights')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
            ${activeTab === 'flights' ? 'bg-bg-primary text-text-primary shadow-lg' : 'bg-white/30 text-white hover:bg-white/50'}
          `}
        >
          <IoPaperPlaneOutline className="text-lg" />
          <span>Chuyến bay</span>
        </button>
        <button
          onClick={() => setActiveTab('stays')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
            ${activeTab === 'stays' ? 'bg-bg-primary text-text-primary shadow-lg' : 'bg-white/30 text-white hover:bg-white/50'}
          `}
        >
          <FiMapPin className="text-lg" />
          <span>Khách sạn</span>
        </button>
      </div>
      
      {/* Nội dung Tab */}
      <div className="relative">
        {/* Nút Search lớn */}
        <button className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 
                       w-16 h-16 bg-brand-primary text-white rounded-full 
                       flex items-center justify-center shadow-lg 
                       hover:bg-opacity-90 transition-all">
          <FiSearch className="text-3xl" />
        </button>

        {/* Hiển thị form tương ứng */}
        {activeTab === 'flights' && <FlightSearchForm />}
        {activeTab === 'stays' && <HotelSearchForm />}
      </div>
    </div>
  );
};

export default SearchTabs;