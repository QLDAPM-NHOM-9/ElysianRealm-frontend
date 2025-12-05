import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiStar, FiMapPin } from 'react-icons/fi';
import Button from '../common/Button.jsx';

const TourCard = ({ id, name, location, price, rating, reviewCount, imageUrl, ...tour }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/tour-detail/${id}`, { state: { tour: { id, name, location, price, rating, reviewCount, imageUrl, ...tour } } });
  };

  return (
    <div className="bg-bg-primary rounded-lg shadow-sm border border-border-primary overflow-hidden flex flex-col md:flex-row">
      {/* Cột ảnh */}
      <div className="w-full md:w-1/3">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-48 md:h-full object-cover" 
        />
      </div>

      {/* Cột nội dung */}
      <div className="w-full md:w-2/3 p-6 flex flex-col">
        {/* Tên và vị trí */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <FiMapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
          <button className="w-9 h-9 flex-shrink-0 flex items-center justify-center border border-border-primary rounded-full text-text-secondary hover:bg-brand-pale hover:text-brand-primary">
            <FiHeart />
          </button>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center gap-1 text-sm font-medium bg-brand-primary text-white py-1 px-2 rounded">
            {rating} <FiStar className="w-3 h-3 fill-current" />
          </span>
          <span className="text-sm font-semibold text-text-primary">Very Good</span>
          <span className="text-sm text-text-secondary">{reviewCount} reviews</span>
        </div>

        {/* Giá và Nút */}
        <div className="mt-auto flex justify-between items-end">
          <div className="text-right">
            <p className="text-xs text-text-secondary">starting from</p>
            <p className="text-2xl font-bold text-brand-secondary">${price}<span className="text-sm font-normal text-text-secondary">/night</span></p>
            <p className="text-xs text-text-secondary">excl. tax</p>
          </div>
          
          <Button 
            variant="secondary" 
            className="px-8"
            onClick={handleViewDetails}
          >
            View Place
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;