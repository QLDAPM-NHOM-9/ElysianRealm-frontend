import React, { useState, useEffect } from 'react';
import { FiSend, FiCompass } from 'react-icons/fi';
import TourCard from '../components/listings/TourCard.jsx';
import Spinner from '../components/common/Spinner.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import tourService from '../services/tourService.js';
import axiosClient from '../services/axiosClient.js';

const FavouritesPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('tours'); // Mặc định là tours
  const [favorites, setFavorites] = useState([]);
  const [favoriteCounts, setFavoriteCounts] = useState({ tours: 0, flights: 0 });
  const [loading, setLoading] = useState(true);

  // Get user's actual favorites from backend
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // TODO: Replace with proper favorites API when backend implements it
        // const response = await axiosClient.get('/favorites');
        // const data = response.data;

        // For now, show placeholder message
        console.log('User favorites API not yet implemented in backend');

        // Set empty favorites and counts
        setFavorites([]);
        setFavoriteCounts({ tours: 0, flights: 0 });
      } catch (error) {
        console.error("Failed to load favourites", error);
        setFavorites([]);
        setFavoriteCounts({ tours: 0, flights: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

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
          {favoriteCounts.flights > 0 && (
            <span className="text-xs bg-gray-200 text-text-secondary rounded-full px-2 py-0.5">
              {favoriteCounts.flights}
            </span>
          )}
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
          {favoriteCounts.tours > 0 && (
            <span className="text-xs bg-gray-200 text-text-secondary rounded-full px-2 py-0.5">
              {favoriteCounts.tours}
            </span>
          )}
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
              {favorites.length > 0 ? (
                favorites.map((tour) => (
                  <TourCard key={tour.id} {...tour} />
                ))
              ) : (
                <div className="text-center py-12 text-text-secondary bg-gray-50 rounded-lg border border-dashed border-border-primary">
                  <FiCompass className="text-4xl text-text-secondary mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Chưa có tour yêu thích nào</p>
                  <p className="text-sm">Khám phá các tour và lưu lại để xem sau.</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
