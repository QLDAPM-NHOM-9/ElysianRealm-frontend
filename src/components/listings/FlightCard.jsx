import React from 'react';
import { FiHeart, FiStar } from 'react-icons/fi';
import Radio from '../common/Radio.jsx'; // <-- IMPORT
import Button from '../common/Button.jsx'; // <-- IMPORT

const FlightCard = ({ airline, logoUrl, price, rating, reviewCount }) => {
  return (
    <div className="bg-bg-primary rounded-lg shadow-sm border border-border-primary overflow-hidden">
      {/* Header của thẻ */}
      <div className="p-4 flex justify-between items-center border-b border-border-primary">
        <img src={logoUrl} alt={airline} className="h-8" />
        <div className="text-right">
          <p className="text-xs text-text-secondary">starting from</p>
          <p className="text-2xl font-bold text-brand-secondary">${price}</p>
        </div>
      </div>
      
      {/* Thông tin chuyến bay (ĐÃ REFACTOR) */}
      {[1, 2].map((i) => (
        <div key={i} className="p-4 flex justify-between items-center border-b border-border-primary last:border-b-0">
          <div className="flex items-center gap-4">
            
            {/* --- DÙNG <Radio> --- */}
            <Radio
              id={`flight_${price}_${i}`}
              name={`flight_${price}`}
            />
            
            <div>
              <p className="font-semibold text-text-primary">12:00 pm - 01:28 pm</p>
              <p className="text-sm text-text-secondary">{airline}</p>
            </div>
          </div>
          <div className="text-sm text-text-secondary">non stop</div>
          <div className="text-sm">
            <p className="font-semibold text-text-primary">2h 28m</p>
            <p className="text-sm text-text-secondary">EWR-BNA</p>
          </div>
        </div>
      ))}
      
      {/* Footer của thẻ (ĐÃ REFACTOR) */}
      <div className="p-4 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-sm font-medium bg-brand-primary text-white py-1 px-2 rounded">
            {rating} <FiStar className="w-3 h-3 fill-current" />
          </span>
          <span className="text-sm font-semibold text-text-primary">Very Good</span>
          <span className="text-sm text-text-secondary">{reviewCount} reviews</span>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            isIconOnly={true} // <-- Thêm prop này
            className="w-12 h-12 rounded-full" // Giờ đã có thể căn giữa
          >
            <FiHeart />
          </Button>
          
          {/* --- DÙNG <Button> --- */}
          <Button variant="secondary">
            View Deals
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;