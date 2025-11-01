import React from 'react';
import FiltersSidebar from '../../components/listings/FiltersSidebar.jsx'; // TÁI SỬ DỤNG
import HotelCard from '../../components/listings/HotelCard.jsx'; // COMPONENT MỚI
import { FiChevronDown } from 'react-icons/fi';

// Dữ liệu mẫu (Thay bằng API)
const hotelsData = [
  {
    name: 'CVK Park Bosphorus Hotel Istanbul',
    location: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437',
    price: 104,
    rating: 4.2,
    reviewCount: 54,
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
    name: 'CVK Park Bosphorus Hotel Istanbul',
    location: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437',
    price: 104,
    rating: 4.2,
    reviewCount: 54,
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80'
  },
];

const HotelListingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cột Filter (Tái sử dụng) */}
        <FiltersSidebar />

        {/* Cột Kết quả */}
        <main className="flex-1">
          {/* Header kết quả (Sắp xếp) */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-text-secondary">Showing 4 of <span className="text-brand-primary font-medium">257 places</span></p>
            <button className="flex items-center gap-2 text-text-primary font-medium">
              Sort by Recommended <FiChevronDown />
            </button>
          </div>

          {/* Danh sách các khách sạn */}
          <div className="space-y-6">
            {hotelsData.map((hotel, index) => (
              <HotelCard key={index} {...hotel} />
            ))}
          </div>

          {/* Nút Show more */}
          <button className="w-full mt-8 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-opacity-90 shadow-md">
            Show more results
          </button>
        </main>
      </div>
    </div>
  );
};

export default HotelListingPage;