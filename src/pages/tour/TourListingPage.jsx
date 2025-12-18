import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FiltersSidebar from '../../components/listings/FiltersSidebar.jsx';
import TourCard from '../../components/listings/TourCard.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import Select from '../../components/common/Select.jsx';
import Button from '../../components/common/Button.jsx';
import tourService from '../../services/tourService.js';
import { FiChevronDown } from 'react-icons/fi';

const TourListingPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('price-asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    priceRange: { min: 0, max: 6000 }, // USD equivalent of our tours
    duration: [],
    destination: [],
    rating: 0
  });
  const [visibleTours, setVisibleTours] = useState(6); // Show 6 tours initially
  const [searchParams] = useSearchParams();

  // Lấy từ khóa tìm kiếm từ URL (ví dụ: ?q=Da Nang)
  const query = searchParams.get('q');

  // Reset visible tours when filters change
  useEffect(() => {
    setVisibleTours(6);
    console.log('Filter changed, resetting visible tours to 6');
  }, [filterValues]);

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

  // Client-side filtering and sorting
  const filteredAndSortedTours = [...tours]
    .filter((tour) => {
      const priceUSD = Math.round(tour.price / 23000);
      const isInPriceRange = priceUSD >= filterValues.priceRange.min && priceUSD <= filterValues.priceRange.max;

      // Duration filtering with proper range checking
      const tourDays = parseInt(tour.duration.split(' ')[0]);
      const durationMatch = filterValues.duration.length === 0 ||
        filterValues.duration.some(filter => {
          switch (filter) {
            case '1-3 ':
              return tourDays >= 1 && tourDays <= 3;
            case '4-7 ':
              return tourDays >= 4 && tourDays <= 7;
            case '7+':
              return tourDays >= 7;
            default:
              return false;
          }
        });

      // Destination filtering (match city names)
      const locationMatch = filterValues.destination.length === 0 ||
        filterValues.destination.some(dest => {
          const locationLower = tour.location.toLowerCase();
          return locationLower.includes(dest);
        });

      return isInPriceRange && durationMatch && locationMatch;
    })
    .sort((a, b) => {
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'price-desc') return b.price - a.price;
      return 0;
    });

  // Pagination - show only visibleTours number of tours
  const displayedTours = filteredAndSortedTours.slice(0, visibleTours);
  const hasMoreTours = filteredAndSortedTours.length > visibleTours;

  // Load more tours
  const loadMoreTours = () => {
    setVisibleTours(prev => prev + 6);
    console.log('Loading more tours, new visible count:', visibleTours + 6);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cột Filter */}
        <FiltersSidebar
          type="tour"
          filterValues={filterValues}
          onFilterChange={setFilterValues}
        />

        {/* Cột Kết quả */}
        <main className="flex-1">
          {/* Header kết quả */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-text-secondary">
              Hiển thị {displayedTours.length} trên{' '}
              <span className="text-brand-primary font-medium">{filteredAndSortedTours.length} tour</span>
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sắp xếp:</span>
              <Select
                className="inline-block w-auto"
                selectClassName="border-none bg-transparent font-semibold text-text-primary focus:ring-0 cursor-pointer"
                value={sortOrder}
                onChange={setSortOrder}
              >
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
              </Select>
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
          ) : filteredAndSortedTours.length > 0 ? (
            // Display Tours
            <div className="space-y-6">
              {displayedTours.map((tour) => (
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
          {!loading && !error && hasMoreTours && (
            <Button
              type="button"
              className="w-full mt-8"
              onClick={loadMoreTours}
            >
              Xem thêm kết quả ({filteredAndSortedTours.length - visibleTours} còn lại)
            </Button>
          )}
        </main>
      </div>
    </div>
  );
};

export default TourListingPage;
