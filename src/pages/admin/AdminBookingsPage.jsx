import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/api.js';
import flightService from '../../services/flightService.js';
import tourService from '../../services/tourService.js';
import Spinner from '../../components/common/Spinner.jsx';
import { FiEye, FiCheck, FiX } from 'react-icons/fi';

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [flights, setFlights] = useState({});
  const [tours, setTours] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch bookings
        const bookingsResponse = await bookingService.getAllBookings();
        const bookingsData = bookingsResponse.data || bookingsResponse;

        // Fetch flights and tours for reference
        const [flightsData, toursData] = await Promise.all([
          flightService.getAll().catch(() => []),
          tourService.getAll().catch(() => [])
        ]);

        // Create lookup maps
        const flightsMap = {};
        (Array.isArray(flightsData) ? flightsData : []).forEach(flight => {
          flightsMap[flight.id] = flight;
        });

        const toursMap = {};
        (Array.isArray(toursData) ? toursData : []).forEach(tour => {
          toursMap[tour.id] = tour;
        });

        setFlights(flightsMap);
        setTours(toursMap);

        // Use API data if available, otherwise use sample data for testing
        const finalBookings = Array.isArray(bookingsData) && bookingsData.length > 0 ? bookingsData : getSampleBookings();
        setBookings(finalBookings);

      } catch (error) {
        console.error("Failed to load bookings data", error);
        setError('Không thể tải dữ liệu đặt chỗ. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Hàm cập nhật trạng thái đơn hàng (Duyệt/Hủy)
  const updateStatus = async (id, newStatus) => {
    try {
      // Call backend API to update status
      await bookingService.updateStatus(id, newStatus);

      // Cập nhật state local để giao diện thay đổi ngay lập tức
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error('Failed to update booking status:', error);
      alert('Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại.');
    }
  };

  // Helper function to get service information
  const getServiceInfo = (booking) => {
    if (booking.type === 'flight') {
      const flight = flights[booking.itemId];
      return {
        name: flight ? `${flight.airline} (${flight.from} - ${flight.to})` : 'Chuyến bay',
        image: flight?.image || 'https://via.placeholder.com/40x40?text=Flight',
        location: flight ? `${flight.from} → ${flight.to}` : 'N/A',
        date: booking.date
      };
    } else if (booking.type === 'tour') {
      const tour = tours[booking.itemId];
      return {
        name: tour ? tour.name : 'Tour du lịch',
        image: tour?.image || 'https://via.placeholder.com/40x40?text=Tour',
        location: tour ? tour.location : 'N/A',
        date: booking.date
      };
    }
    return {
      name: 'Dịch vụ',
      image: 'https://via.placeholder.com/40x40?text=Service',
      location: 'N/A',
      date: booking.date
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
      case 'pending': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming':
      case 'pending': return 'Đang xử lý';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  // Sample data for testing when backend has no bookings
  const getSampleBookings = () => {
    return [
      {
        id: 1,
        type: 'flight',
        itemId: 1, // Will be looked up in flights map
        status: 'pending',
        date: '2025-01-15',
        guests: 2,
        paymentMethod: 'credit_card',
        totalPrice: 450.00,
        bookingNumber: 'BK1001',
        userId: 1
      },
      {
        id: 2,
        type: 'tour',
        itemId: 1, // Will be looked up in tours map
        status: 'completed',
        date: '2025-01-20',
        guests: 1,
        paymentMethod: 'paypal',
        totalPrice: 320.00,
        bookingNumber: 'BK1002',
        userId: 2
      },
      {
        id: 3,
        type: 'flight',
        itemId: 2, // Will be looked up in flights map
        status: 'cancelled',
        date: '2025-01-10',
        guests: 3,
        paymentMethod: 'bank_transfer',
        totalPrice: 675.00,
        bookingNumber: 'BK1003',
        userId: 1
      },
      {
        id: 4,
        type: 'tour',
        itemId: 2, // Will be looked up in tours map
        status: 'pending',
        date: '2025-02-05',
        guests: 2,
        paymentMethod: 'credit_card',
        totalPrice: 580.00,
        bookingNumber: 'BK1004',
        userId: 3
      }
    ];
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Spinner size="lg" />
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-6 font-serif">Quản lý Đặt chỗ</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="bg-bg-primary rounded-xl shadow-sm border border-border-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-border-primary">
              <tr>
                <th className="p-4 font-semibold text-text-secondary">Mã đặt chỗ</th>
                <th className="p-4 font-semibold text-text-secondary">Loại</th>
                <th className="p-4 font-semibold text-text-secondary">Khách hàng</th>
                <th className="p-4 font-semibold text-text-secondary">Dịch vụ</th>
                <th className="p-4 font-semibold text-text-secondary">Thanh toán</th>
                <th className="p-4 font-semibold text-text-secondary">Trạng thái</th>
                <th className="p-4 font-semibold text-text-secondary">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary">
              {bookings.length > 0 ? bookings.map((booking) => {
                const serviceInfo = getServiceInfo(booking);

                // Determine payment status based on payment method and booking status
                const getPaymentStatus = () => {
                  if (booking.status === 'cancelled') return { text: 'Đã hủy', color: 'bg-gray-100 text-gray-700' };
                  if (booking.status === 'completed') return { text: 'Đã thanh toán', color: 'bg-green-100 text-green-700' };
                  if (booking.paymentMethod) {
                    // If payment method exists and status is pending, it means payment is being processed
                    return { text: 'Đang xử lý thanh toán', color: 'bg-yellow-100 text-yellow-700' };
                  }
                  return { text: 'Chưa thanh toán', color: 'bg-red-100 text-red-700' };
                };

                const paymentStatus = getPaymentStatus();

                return (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-brand-primary">#{booking.bookingNumber || booking.id}</p>
                        <p className="text-xs text-text-secondary">{booking.guests} khách</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${booking.type === 'flight' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                        {booking.type === 'flight' ? 'Bay' : 'Tour'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium text-text-primary">User #{booking.userId}</p>
                        <p className="text-xs text-text-secondary">
                          ${booking.totalPrice?.toFixed(2) || 'N/A'}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="max-w-[200px]">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {serviceInfo.name}
                        </p>
                        <p className="text-xs text-text-secondary truncate">
                          {serviceInfo.location}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {serviceInfo.date ? new Date(serviceInfo.date).toLocaleDateString('vi-VN') : 'N/A'}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${paymentStatus.color}`}>
                          {paymentStatus.text}
                        </span>
                        {booking.paymentMethod && (
                          <p className="text-xs text-text-secondary mt-1 capitalize">
                            {booking.paymentMethod.replace('_', ' ')}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-pale rounded transition-colors"
                          title="Xem chi tiết"
                        >
                          <FiEye />
                        </button>

                        {/* Nút Duyệt */}
                        <button
                          onClick={() => updateStatus(booking.id, 'completed')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Duyệt"
                          disabled={booking.status === 'completed' || booking.status === 'cancelled'}
                        >
                          <FiCheck />
                        </button>

                        {/* Nút Hủy */}
                        <button
                          onClick={() => updateStatus(booking.id, 'cancelled')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Hủy"
                          disabled={booking.status === 'completed' || booking.status === 'cancelled'}
                        >
                          <FiX />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-text-secondary">
                    Chưa có đơn hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingsPage;
