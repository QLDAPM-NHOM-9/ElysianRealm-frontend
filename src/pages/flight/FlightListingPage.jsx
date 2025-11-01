import React from 'react';
import FiltersSidebar from '../../components/listings/FiltersSidebar.jsx';
import FlightCard from '../../components/listings/FlightCard.jsx';
import { FiChevronDown } from 'react-icons/fi';

// Dữ liệu mẫu (Thay bằng API)
const flightsData = [
  { airline: 'Emirates', logoUrl: 'https://via.placeholder.com/100x30/CCCCCC/FFFFFF?text=Emirates', price: 104, rating: 4.2, reviewCount: 54 },
  { airline: 'Fly Dubai', logoUrl: 'https://via.placeholder.com/100x30/CCCCCC/FFFFFF?text=Fly+Dubai', price: 104, rating: 4.2, reviewCount: 54 },
  { airline: 'Qatar', logoUrl: 'https://via.placeholder.com/100x30/CCCCCC/FFFFFF?text=Qatar', price: 104, rating: 4.2, reviewCount: 54 },
  { airline: 'Etihad', logoUrl: 'https://via.placeholder.com/100x30/CCCCCC/FFFFFF?text=Etihad', price: 104, rating: 4.2, reviewCount: 54 },
];

const FlightListingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cột Filter */}
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

          {/* Danh sách các chuyến bay */}
          <div className="space-y-6">
            {flightsData.map((flight, index) => (
              <FlightCard key={index} {...flight} />
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

export default FlightListingPage;