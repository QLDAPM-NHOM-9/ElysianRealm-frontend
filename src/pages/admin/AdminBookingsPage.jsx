import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/api.js';
import Spinner from '../../components/common/Spinner.jsx';
import { FiEye, FiCheck, FiX } from 'react-icons/fi';

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load dữ liệu
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getAllBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to load bookings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Hàm cập nhật trạng thái đơn hàng (Duyệt/Hủy)
  const updateStatus = (id, newStatus) => {
    // Cập nhật state local để giao diện thay đổi ngay lập tức
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Spinner size="lg" /></div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-6 font-serif">Quản lý Đặt chỗ</h1>
      
      <div className="bg-bg-primary rounded-xl shadow-sm border border-border-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-border-primary">
              <tr>
                <th className="p-4 font-semibold text-text-secondary">ID</th>
                <th className="p-4 font-semibold text-text-secondary">Loại</th>
                <th className="p-4 font-semibold text-text-secondary">Chi tiết</th>
                <th className="p-4 font-semibold text-text-secondary">Ngày đi</th>
                <th className="p-4 font-semibold text-text-secondary">Trạng thái</th>
                <th className="p-4 font-semibold text-text-secondary">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary">
              {bookings.length > 0 ? bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-brand-primary">#{booking.id}</td>
                  <td className="p-4 capitalize">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${booking.type === 'flight' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                      {booking.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={booking.details.img} alt="" className="w-10 h-10 rounded object-cover" />
                      <div className="max-w-[200px]">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {booking.type === 'flight' ? booking.details.airline : booking.details.name || booking.details.title}
                        </p>
                        <p className="text-xs text-text-secondary truncate">
                          {booking.type === 'flight' ? `${booking.details.from} -> ${booking.details.to}` : booking.details.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-text-primary">
                    {booking.type === 'flight' ? booking.date : booking.details.startDate || booking.details.checkIn}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-pale rounded transition-colors" title="Xem chi tiết">
                        <FiEye />
                      </button>
                      
                      {/* Nút Duyệt */}
                      <button 
                        onClick={() => updateStatus(booking.id, 'completed')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" 
                        title="Duyệt"
                      >
                        <FiCheck />
                      </button>
                      
                      {/* Nút Hủy */}
                      <button 
                        onClick={() => updateStatus(booking.id, 'cancelled')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" 
                        title="Hủy"
                      >
                        <FiX />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-text-secondary">Chưa có đơn hàng nào.</td>
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