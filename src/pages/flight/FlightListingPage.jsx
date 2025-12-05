import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Để đọc ?q= từ URL
import FiltersSidebar from '../../components/listings/FiltersSidebar.jsx';
import FlightCard from '../../components/listings/FlightCard.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import flightService from '../../services/flightService.js';
import { FiChevronDown } from 'react-icons/fi';

const FlightListingPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('price-asc'); // State sắp xếp
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

  // Logic sắp xếp (Client-side sorting)
  const sortedFlights = [...flights].sort((a, b) => {
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
              Showing {flights.length} of <span className="text-brand-primary font-medium">{flights.length} places</span>
            </p>
            
            {/* Dropdown sắp xếp đơn giản */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select 
                className="border-none bg-transparent font-semibold text-text-primary focus:ring-0 cursor-pointer"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="price-asc">Cheapest First</option>
                <option value="price-desc">Expensive First</option>
              </select>
            </div>
          </div>

          {/* Nội dung danh sách */}
          {loading ? (
            // Hiển thị Spinner khi đang tải
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : sortedFlights.length > 0 ? (
            // Hiển thị danh sách nếu có dữ liệu
            <div className="space-y-6">
              {sortedFlights.map((flight) => (
                <FlightCard key={flight.id} {...flight} />
              ))}
            </div>
          ) : (
            // Hiển thị thông báo nếu không tìm thấy
            <div className="text-center py-12 text-text-secondary">
              No flights found matching "{query}".
            </div>
          )}

          {/* Nút Show more (Chỉ hiện khi có dữ liệu) */}
          {!loading && sortedFlights.length > 0 && (
            <button className="w-full mt-8 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-opacity-90 shadow-md">
              Show more results
            </button>
          )}
        </main>
      </div>
    </div>
  );
};

export default FlightListingPage;