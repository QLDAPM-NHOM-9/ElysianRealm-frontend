import React, { useState } from 'react';
import { FiSend, FiMapPin } from 'react-icons/fi';
import HotelCard from '../components/listings/HotelCard.jsx'; // TÁI SỬ DỤNG

// Dữ liệu mẫu (Thay bằng API)
const favouriteHotels = [
  {
    name: 'CVK Park Bosphorus Hotel Istanbul',
    location: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437',
    price: 240, // Giá trong design là 'starting from $240'
    rating: 4.2,
    reviewCount: 54, // '54 reviews' (từ design trước)
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbFEeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Eresin Hotels Sultanahmet - Boutique Class',
    location: 'Kucukayasofya Mh. Kucuk Ayasofya, Istanbul 34400',
    price: 104,
    rating: 4.2,
    reviewCount: 54,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Eresin Hotels Sultanahmet - Boutique Class',
    location: 'Kucukayasofya Mh. Kucuk Ayasofya, Istanbul 34400',
    price: 104,
    rating: 4.2,
    reviewCount: 54,
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80'
  },
];


const FavouritesPage = () => {
  const [activeTab, setActiveTab] = useState('places'); // 'flights' hoặc 'places'

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold text-text-primary mb-8">Yêu thích</h1>

      {/* Tabs (Flights / Places) */}
      <div className="flex items-center border-b border-border-primary mb-6">
        <button
          onClick={() => setActiveTab('flights')}
          className={`flex items-center gap-2 py-3 px-4 font-medium border-b-2
            ${activeTab === 'flights' 
              ? 'border-brand-primary text-brand-primary' 
              : 'border-transparent text-text-secondary hover:text-text-primary'}
          `}
        >
          <FiSend />
          <span>Chuyến bay</span>
          <span className="text-xs bg-gray-200 text-text-secondary rounded-full px-2 py-0.5">2</span>
        </button>
        <button
          onClick={() => setActiveTab('places')}
          className={`flex items-center gap-2 py-3 px-4 font-medium border-b-2
            ${activeTab === 'places' 
              ? 'border-brand-primary text-brand-primary' 
              : 'border-transparent text-text-secondary hover:text-text-primary'}
          `}
        >
          <FiMapPin />
          <span>Địa điểm</span>
          <span className="text-xs bg-gray-200 text-text-secondary rounded-full px-2 py-0.5">3</span>
        </button>
      </div>

      {/* Nội dung Tab */}
      <div className="space-y-6">
        {activeTab === 'flights' && (
          <div className="text-center text-text-secondary py-12">
            <h3 className="text-xl font-medium">Chưa có chuyến bay yêu thích</h3>
            <p>Phần này sẽ hiển thị các chuyến bay đã lưu của bạn.</p>
            {/* (Bạn có thể tái sử dụng <FlightCard /> ở đây khi có dữ liệu) */}
          </div>
        )}
        
        {activeTab === 'places' && (
          <>
            {favouriteHotels.map((hotel, index) => (
              <HotelCard key={index} {...hotel} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;