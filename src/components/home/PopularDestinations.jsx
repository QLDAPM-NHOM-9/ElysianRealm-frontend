import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { homeApi } from '../../services/api.js';
import Spinner from '../common/Spinner.jsx';

// Component thẻ con
const DestinationCard = ({ img, title, tags }) => {
  // Tách tên thành phố để search
  const cityName = title.split(',')[0]; 

  return (
    <Link 
      to={`/tour-listing?q=${cityName}`} // <-- SỬA LINK THÀNH TOUR
      className="flex items-center gap-4 p-4 bg-bg-primary rounded-lg shadow-sm hover:shadow-lg transition-shadow"
    >
      <img src={img} alt={title} className="w-20 h-20 rounded-lg object-cover" />
      <div>
        <h4 className="font-bold text-text-primary">{title}</h4>
        {/* Update text tags nếu dữ liệu API chưa cập nhật */}
        <p className="text-sm text-text-secondary">{tags}</p>
      </div>
    </Link>
  );
};

const PopularDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await homeApi.getDestinations();
        setDestinations(data);
      } catch (error) {
        console.error("Failed to load destinations", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-2">Điểm đến phổ biến</h2>
          <p className="text-text-secondary">Tìm kiếm Chuyến bay & Tour du lịch</p>
        </div>
        <Link to="/tour-listing" className="text-brand-primary font-medium hover:underline">
          Xem tất cả
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularDestinations;