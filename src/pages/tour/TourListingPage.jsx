import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FiltersSidebar from '../../components/listings/FiltersSidebar.jsx';
import TourCard from '../../components/listings/TourCard.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import tourService from '../../services/tourService.js';
import { FiChevronDown } from 'react-icons/fi';

const TourListingPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('price-asc');
  const [searchParams] = useSearchParams();

  // Lấy từ khóa tìm kiếm từ URL (ví dụ: ?q=Da Nang)
  const query = searchParams.get('q');

  // Gọi API lấy danh sách Tour
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError('');
      try {
        // Call API with search parameters
        const data = await tourService.search(query || '', sortOrder);
        setTours(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch tours:', err);
        setError('Không thể tải danh sách tour. Vui lòng thử lại.');
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [query, sortOrder]);

  // Client-side sorting
  const sortedTours = [...tours].sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price;
    if (sortOrder === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cột Filter */}
        <FiltersSidebar />

        {/* Cột Kết quả */}
        <main className="flex-1">
          {/* Header kết quả */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-text-secondary">
              Hiển thị {sortedTours.length} trên{' '}
              <span className="text-brand-primary font-medium">{sortedTours.length} tour</span>
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sắp xếp:</span>
              <select
                className="border-none bg-transparent font-semibold text-text-primary focus:ring-0 cursor-pointer"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
              </select>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center py-12 text-red-500 bg-red-50 rounded-lg border border-red-200">
              <p>{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : sortedTours.length > 0 ? (
            // Display Tours
            <div className="space-y-6">
              {sortedTours.map((tour) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>
          ) : (
            // No Results
            <div className="text-center py-12 text-text-secondary bg-gray-50 rounded-lg border border-dashed border-border-primary">
              <p>
                {query
                  ? `Không tìm thấy tour nào phù hợp với "${query}".`
                  : 'Không có tour nào khả dụng.'}
              </p>
              <p className="text-sm mt-2">Hãy thử tìm "Hạ Long", "Đà Nẵng" hoặc "Nhật Bản".</p>
            </div>
          )}

          {/* Load More Button */}
          {!loading && !error && sortedTours.length > 0 && (
            <button className="w-full mt-8 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-opacity-90 shadow-md">
              Xem thêm kết quả
            </button>
          )}
        </main>
      </div>
    </div>
  );
};

export default TourListingPage;