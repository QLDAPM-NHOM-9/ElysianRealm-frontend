import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Để đọc ?q= từ URL
import FiltersSidebar from '../../components/listings/FiltersSidebar.jsx';
import FlightCard from '../../components/listings/FlightCard.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import Select from '../../components/common/Select.jsx';
import Button from '../../components/common/Button.jsx';
import flightService from '../../services/flightService.js';
import { FiChevronDown } from 'react-icons/fi';

const FlightListingPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('price-asc'); // State sắp xếp
  const [filterValues, setFilterValues] = useState({
    priceRange: { min: 0, max: 6000 },
    airlines: [],
    departureTime: [],
    rating: 0
  });
  const [searchParams] = useSearchParams();
  
  const query = searchParams.get('q'); // Lấy từ khóa tìm kiếm từ URL

  // Gọi API giả khi trang được load
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const data = await flightService.getAll();
        
        // Giả lập lọc theo từ khóa tìm kiếm (nếu có) ở phía Client
        let filteredData = data;
        if (query) {
          const lowerQuery = query.toLowerCase();
          filteredData = data.filter(f => 
            f.airline.toLowerCase().includes(lowerQuery) || 
            f.from.toLowerCase().includes(lowerQuery) ||
            f.to.toLowerCase().includes(lowerQuery)
          );
        }
        
        setFlights(filteredData);
      } catch (error) {
        console.error("Failed to fetch flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [query]); // Chạy lại khi từ khóa tìm kiếm thay đổi

  // Logic lọc và sắp xếp (Client-side filtering and sorting)
  const getFilteredAndSortedFlights = () => {
    let filtered = [...flights];

    // Lọc theo giá
    if (filterValues.priceRange) {
      filtered = filtered.filter(flight =>
        flight.price >= filterValues.priceRange.min &&
        flight.price <= filterValues.priceRange.max
      );
    }

    // Lọc theo hãng hàng không
    if (filterValues.airlines && filterValues.airlines.length > 0) {
      filtered = filtered.filter(flight =>
        filterValues.airlines.includes(flight.airline)
      );
    }

    // Lọc theo thời gian bay
    if (filterValues.departureTime && filterValues.departureTime.length > 0) {
      filtered = filtered.filter(flight => {
        const departureHour = new Date(flight.departureTime).getHours();
        return filterValues.departureTime.some(time => {
          if (time === 'morning') return departureHour >= 5 && departureHour < 12;
          if (time === 'afternoon') return departureHour >= 12 && departureHour < 18;
          if (time === 'evening') return departureHour >= 18 && departureHour < 24;
          return false;
        });
      });
    }

    // Sắp xếp
    filtered.sort((a, b) => {
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'price-desc') return b.price - a.price;
      return 0;
    });

    return filtered;
  };

  const filteredAndSortedFlights = getFilteredAndSortedFlights();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cột Filter */}
        <FiltersSidebar
          type="flight"
          filterValues={filterValues}
          onFilterChange={setFilterValues}
        />

        {/* Cột Kết quả */}
        <main className="flex-1">
          {/* Header kết quả */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-text-secondary">
              Showing {filteredAndSortedFlights.length} of <span className="text-brand-primary font-medium">{flights.length} places</span>
            </p>
            
            {/* Dropdown sắp xếp đơn giản */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <Select
                className="inline-block w-auto"
                selectClassName="border-none bg-transparent font-semibold text-text-primary focus:ring-0 cursor-pointer"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="price-asc">Cheapest First</option>
                <option value="price-desc">Expensive First</option>
              </Select>
            </div>
          </div>

          {/* Nội dung danh sách */}
          {loading ? (
            // Hiển thị Spinner khi đang tải
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : filteredAndSortedFlights.length > 0 ? (
            // Hiển thị danh sách nếu có dữ liệu
            <div className="space-y-6">
              {filteredAndSortedFlights.map((flight) => (
                <FlightCard key={flight.id} {...flight} />
              ))}
            </div>
          ) : (
            // Hiển thị thông báo nếu không tìm thấy
            <div className="text-center py-12 text-text-secondary">
              No flights found matching your filters.
            </div>
          )}

          {/* Nút Show more (Chỉ hiện khi có dữ liệu) */}
          {!loading && filteredAndSortedFlights.length > 0 && (
            <Button type="button" className="w-full mt-8">
              Show more results
            </Button>
          )}
        </main>
      </div>
    </div>
  );
};

export default FlightListingPage;
