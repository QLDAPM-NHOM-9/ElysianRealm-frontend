import React, { useState, useEffect } from 'react';
import { FiSend, FiCompass, FiMapPin, FiChevronRight, FiDownload, FiCalendar } from 'react-icons/fi';
import { bookingService } from '../../services/api.js';
import Spinner from '../../components/common/Spinner.jsx';

// Component vé máy bay
const FlightTicketCard = ({ data }) => (
  <div className="bg-bg-primary border border-border-primary rounded-lg p-4 flex flex-col md:flex-row items-center justify-between shadow-sm gap-4">
    <div className="flex items-center gap-4 w-full md:w-auto">
      <div className="w-12 h-12 rounded-full border border-border-primary flex items-center justify-center bg-white p-2">
        <img
          src={data.details.logoUrl}
          alt="Airline"
          className="w-full h-full object-contain"
        />
      </div>
      <div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span>{data.details.from}</span>
          <FiSend className="text-brand-primary" />
          <span>{data.details.to}</span>
        </div>
        <p className="font-semibold text-text-primary mt-1">{data.details.airline}</p>
      </div>
    </div>
    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
      <div className="text-sm">
        <p className="text-text-secondary">Ngày đặt</p>
        <p className="font-semibold text-text-primary">{data.date}</p>
      </div>
      <div className="text-sm">
        <p className="text-text-secondary">Trạng thái</p>
        <p
          className={`font-semibold capitalize ${
            data.status === 'completed'
              ? 'text-green-600'
              : data.status === 'cancelled'
              ? 'text-red-600'
              : 'text-blue-600'
          }`}
        >
          {data.status === 'upcoming' ? 'Sắp tới' : data.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
        </p>
      </div>
      <button className="bg-brand-pale text-brand-primary font-medium py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-opacity-80">
        <FiDownload />
        <span className="hidden sm:inline">Vé điện tử</span>
      </button>
    </div>
  </div>
);

// Component vé tour
const TourBookingCard = ({ data }) => (
  <div className="bg-bg-primary border border-border-primary rounded-lg p-4 flex flex-col md:flex-row items-center justify-between shadow-sm gap-4">
    <div className="flex items-center gap-4 w-full md:w-auto">
      <img src={data.details.img} alt="Tour" className="w-16 h-16 rounded-lg object-cover" />
      <div>
        <p className="font-semibold text-text-primary line-clamp-1">
          {data.details.name || data.details.title}
        </p>
        <div className="flex items-center gap-2 text-sm text-text-secondary mt-1">
          <FiMapPin className="w-4 h-4 text-brand-primary" />
          <span>{data.details.location}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
      <div className="text-sm">
        <p className="text-text-secondary">Khởi hành</p>
        <div className="flex items-center gap-1 font-semibold text-text-primary">
          <FiCalendar /> {data.details.startDate}
        </div>
      </div>
      <div className="text-sm">
        <p className="text-text-secondary">Trạng thái</p>
        <p
          className={`font-semibold capitalize ${
            data.status === 'completed'
              ? 'text-green-600'
              : data.status === 'cancelled'
              ? 'text-red-600'
              : 'text-blue-600'
          }`}
        >
          {data.status === 'upcoming' ? 'Sắp tới' : data.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
        </p>
      </div>
      <button className="bg-brand-pale text-brand-primary font-medium py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-opacity-80">
        <FiDownload />
        <span className="hidden sm:inline">Vé Tour</span>
      </button>
    </div>
  </div>
);

const AccountHistoryPage = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getMyBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load bookings', err);
        setError('Không thể tải lịch sử đặt chỗ');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Lọc danh sách
  const filteredBookings = bookings.filter((b) =>
    activeTab === 'flights' ? b.type === 'flight' : b.type === 'tour'
  );

  return (
    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-6">Lịch sử Đặt chỗ</h3>

      <div className="flex items-center border-b border-border-primary mb-6">
        <button
          onClick={() => setActiveTab('flights')}
          className={`flex items-center gap-2 py-3 px-4 font-medium border-b-2 transition-colors ${
            activeTab === 'flights'
              ? 'border-brand-primary text-brand-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          <FiSend />
          <span>Chuyến bay</span>
        </button>
        <button
          onClick={() => setActiveTab('tours')}
          className={`flex items-center gap-2 py-3 px-4 font-medium border-b-2 transition-colors ${
            activeTab === 'tours'
              ? 'border-brand-primary text-brand-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          <FiCompass />
          <span>Tours</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) =>
              activeTab === 'flights' ? (
                <FlightTicketCard key={booking.id} data={booking} />
              ) : (
                <TourBookingCard key={booking.id} data={booking} />
              )
            )
          ) : (
            <div className="text-center py-12 text-text-secondary bg-gray-50 rounded-lg border border-dashed border-border-primary">
              <p>
                Bạn chưa đặt{' '}
                {activeTab === 'flights' ? 'chuyến bay' : 'tour'} nào.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountHistoryPage;