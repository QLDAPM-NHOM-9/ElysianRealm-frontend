import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiClock, FiMapPin, FiCalendar } from 'react-icons/fi';
import Button from '../common/Button.jsx';

const TourCard = ({ id, title, location, price, duration, startDate, description, imageUrl, ...tour }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/tour-detail/${id}`, { state: { tour: { id, title, location, price, duration, startDate, description, imageUrl, ...tour } } });
  };

  // Format price from VND to USD (approximate conversion)
  const priceUSD = Math.round(price / 23000);

  // Format date
  const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Get description snippet (first 120 chars)
  const descriptionSnippet = description ? description.split('.').slice(0, 2).join('. ').substring(0, 120) + '...' : '';

  return (
    <div className="bg-bg-primary rounded-lg shadow-sm border border-border-primary overflow-hidden flex flex-col md:flex-row">
      {/* Cột ảnh */}
      <div className="w-full md:w-1/3">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 md:h-full object-cover"
        />
      </div>

      {/* Cột nội dung */}
      <div className="w-full md:w-2/3 p-6 flex flex-col">
        {/* Tên và vị trí */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <FiMapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
          <button className="w-9 h-9 flex-shrink-0 flex items-center justify-center border border-border-primary rounded-full text-text-secondary hover:bg-brand-pale hover:text-brand-primary">
            <FiHeart />
          </button>
        </div>

        {/* Tour details: Duration, Date, and Description */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-text-secondary">
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiCalendar className="w-4 h-4" />
            <span>Khởi hành: {formattedDate}</span>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {descriptionSnippet}
        </p>

        {/* Giá và Nút */}
        <div className="mt-auto flex justify-between items-end">
          <div className="text-right">
            <p className="text-xs text-text-secondary">starting from</p>
            <p className="text-2xl font-bold text-brand-secondary">${priceUSD.toLocaleString()}<span className="text-sm font-normal text-text-secondary">/person</span></p>
            <p className="text-xs text-text-secondary">incl. all taxes</p>
          </div>

          <Button
            variant="secondary"
            className="px-8"
            onClick={handleViewDetails}
          >
            Chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
