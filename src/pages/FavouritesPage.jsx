import React, { useState, useEffect } from 'react';
import { FiSend, FiCompass } from 'react-icons/fi';
import TourCard from '../components/listings/TourCard.jsx';
import Spinner from '../components/common/Spinner.jsx';
import tourService from '../services/tourService.js';
import flightService from '../services/flightService.js';

const FavouritesPage = () => {
  const [activeTab, setActiveTab] = useState('tours'); // Mặc định là tours
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Giả lập gọi API lấy danh sách yêu thích
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'tours') {
          const data = await tourService.getAll();
          setFavorites(Array.isArray(data) ? data.slice(0, 3) : []);
        } else {
          const data = await flightService.getAll();
          setFavorites(Array.isArray(data) ? data.slice(0, 2) : []);
        }
      } catch (error) {
        console.error("Failed to load favourites", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold text-text-primary mb-8 font-serif">Yêu thích</h1>

      {/* Tabs */}
      <div className="flex items-center border-b border-border-primary mb-6">
        <button
          onClick={() => setActiveTab('flights')}
          className={`flex items-center gap-2 py-3 px-4 font-medium border-b-2 transition-colors
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
          onClick={() => setActiveTab('tours')}
          className={`flex items-center gap-2 py-3 px-4 font-medium border-b-2 transition-colors
            ${activeTab === 'tours' 
              ? 'border-brand-primary text-brand-primary' 
              : 'border-transparent text-text-secondary hover:text-text-primary'}
          `}
        >
          <FiCompass />
          <span>Tours</span>
          <span className="text-xs bg-gray-200 text-text-secondary rounded-full px-2 py-0.5">3</span>
        </button>
      </div>

      {/* Nội dung */}
      {loading ? (
        <div className="flex justify-center py-12"><Spinner size="lg" /></div>
      ) : (
        <div className="space-y-6">
          {activeTab === 'flights' && (
            <div className="text-center py-12 text-text-secondary bg-gray-50 rounded-lg border border-dashed border-border-primary">
              <p>Tính năng hiển thị vé yêu thích đang phát triển.</p>
            </div>
          )}
          
          {activeTab === 'tours' && (
            <>
              {favorites.map((tour) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;