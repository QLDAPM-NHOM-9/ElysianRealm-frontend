import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import FlightSearchForm from './FlightSearchForm.jsx';
import TourSearchForm from './TourSearchForm.jsx';

const SearchTabs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flights');

  // --- STATE MỚI CHO FORM FLIGHTS ---
  const [flightData, setFlightData] = useState({
    from: '', 
    to: '', 
    tripType: 'Return', 
    departDate: '', 
    returnDate: '',
    passengers: 1,
    classType: 'Economy'
  });

  // --- STATE CHO FORM TOURS ---
  const [tourData, setTourData] = useState({
    destination: '', 
    startDate: '', 
    guests: 2
  });

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    if (activeTab === 'flights') {
      // Logic xử lý query cho Flight
      // (Ví dụ: Chỉ lấy điểm đến "to" để search)
      const query = flightData.to || '';
      navigate(`/flight-listing?q=${query}`);
    } else {
      // Logic xử lý query cho Tour
      // (Lấy tên thành phố từ chuỗi "Istanbul, Turkey")
      const query = tourData.destination ? tourData.destination.split(',')[0] : '';
      navigate(`/tour-listing?q=${query}`);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto text-left relative">
      {/* Các nút Tab */}
      <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
        <button
          onClick={() => setActiveTab('flights')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
            ${activeTab === 'flights' ? 'bg-white text-text-primary shadow-lg' : 'bg-white/30 text-white hover:bg-white/50 backdrop-blur-sm'}
          `}
        >
          <IoPaperPlaneOutline className="text-lg" />
          <span>Flights</span>
        </button>
        <button
          onClick={() => setActiveTab('tours')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
            ${activeTab === 'tours' ? 'bg-white text-text-primary shadow-lg' : 'bg-white/30 text-white hover:bg-white/50 backdrop-blur-sm'}
          `}
        >
          <FiMapPin className="text-lg" />
          <span>Tours</span>
        </button>
      </div>
      
      {/* Nội dung Tab & Nút Search */}
      <div className="relative">
        {/* Nút Search Lớn */}
        <button 
          onClick={handleSearch}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:-right-6 md:top-1/2 md:-translate-y-1/2 z-20 
                     w-16 h-16 bg-brand-primary text-white rounded-2xl 
                     flex items-center justify-center shadow-xl border-4 border-white/20
                     hover:bg-brand-secondary transition-all transform hover:scale-105"
        >
          <FiSearch className="text-3xl" />
        </button>

        {/* Hiển thị form tương ứng */}
        {activeTab === 'flights' && (
          <FlightSearchForm 
            data={flightData} 
            onChange={(field, value) => setFlightData({ ...flightData, [field]: value })} 
          />
        )}
        {activeTab === 'tours' && (
          <TourSearchForm 
            data={tourData} 
            onChange={(field, value) => setTourData({ ...tourData, [field]: value })} 
          />
        )}
      </div>
    </div>
  );
};

export default SearchTabs;