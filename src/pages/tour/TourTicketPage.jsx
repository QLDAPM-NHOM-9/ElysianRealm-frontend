import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiUsers, FiClock, FiCheckCircle, FiDownload } from 'react-icons/fi';
import { bookingService } from '../../services/api.js';
import { tourService } from '../../services/tourService.js';
import Spinner from '../../components/common/Spinner.jsx';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

const TourTicketPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = location.state?.isAdmin || false;
  const [booking, setBooking] = useState(null);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);

        // Fetch booking details - handle both response.data and direct response
        const bookingResponse = await (isAdmin ? bookingService.getByIdAdmin(id) : bookingService.getById(id));
        const bookingData = bookingResponse?.data || bookingResponse;
        
        if (!bookingData || Object.keys(bookingData).length === 0) {
          setError('Dữ liệu vé không hợp lệ.');
          setLoading(false);
          return;
        }
        
        setBooking(bookingData);

        // Fetch tour details if itemId exists
        if (bookingData.itemId) {
          try {
            const tourResponse = await tourService.getById(bookingData.itemId);
            const tourData = tourResponse?.data || tourResponse;
            setTour(tourData);
          } catch (tourErr) {
            console.warn('Failed to fetch tour details:', tourErr);
            // Don't fail the whole page if tour details fail
          }
        }

      } catch (err) {
        console.error('Failed to fetch booking details:', err);
        const errorMessage = err?.response?.data?.message || err?.message || 'Không thể tải thông tin vé. Vui lòng thử lại.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookingDetails();
    }
  }, [id, isAdmin]);

  const handleDownloadTicket = () => {
    // Simple print functionality
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Không tìm thấy thông tin vé'}
          </h2>
          <Button onClick={() => navigate('/account/history')}>
            Quay lại lịch sử đặt chỗ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Vé Tour</h1>
              <p className="text-gray-600">Mã booking: {booking.bookingNumber || booking.id}</p>
            </div>
            <Button
              onClick={handleDownloadTicket}
              className="flex items-center gap-2"
            >
              <FiDownload />
              Tải vé
            </Button>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <FiCheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {booking.status === 'CONFIRMED' ? 'Đã thanh toán' :
                 booking.status === 'COMPLETED' ? 'Hoàn thành' :
                 booking.status === 'PENDING' ? 'Chưa thanh toán' :
                 booking.status === 'CANCELLED' ? 'Đã hủy' : 'Sắp tới'}
              </h3>
              <p className="text-gray-600">Trạng thái booking của bạn</p>
            </div>
          </div>
        </div>

        {/* Tour Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Tour Image */}
            <div className="lg:w-1/3">
              <img
                src={tour?.imageUrl || '/default-tour-image.png'}
                alt={tour?.title || 'Tour'}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = '/default-tour-image.png';
                }}
              />
            </div>

            {/* Tour Info */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{tour?.title || 'Tour du lịch'}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <FiMapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Địa điểm</p>
                    <p className="font-semibold text-gray-900">{tour?.location || 'Chưa xác định'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FiCalendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Ngày khởi hành</p>
                    <p className="font-semibold text-gray-900">
                      {booking.date ? new Date(booking.date).toLocaleDateString('vi-VN') :
                       tour?.startDate || 'Chưa xác định'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FiClock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Thời gian</p>
                    <p className="font-semibold text-gray-900">{tour?.duration || 'Chưa xác định'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FiUsers className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Số người</p>
                    <p className="font-semibold text-gray-900">{booking.quantity || booking.guests || 1} người</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Tổng tiền</span>
                  <span className="text-2xl font-bold text-green-600">
                    {(booking.totalAmount || booking.totalPrice || tour?.price || 0).toLocaleString()} VND
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin đặt chỗ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Thông tin khách hàng</h4>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Email:</span> {user?.email || 'Chưa cập nhật'}</p>
                <p><span className="font-medium">SĐT:</span> {user?.phone || 'Chưa cập nhật'}</p>
                <p><span className="font-medium">Tên:</span> {user?.name || 'Chưa cập nhật'}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Chi tiết booking</h4>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Mã booking:</span> {booking.bookingNumber || booking.id}</p>
                <p><span className="font-medium">Ngày đặt:</span> {new Date(booking.createdAt || Date.now()).toLocaleDateString('vi-VN')}</p>
                <p><span className="font-medium">Trạng thái:</span> {booking.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tour Description */}
        {tour?.description && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mô tả tour</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{tour.description}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/account/history')}
          >
            Quay lại lịch sử
          </Button>
          <Button onClick={handleDownloadTicket}>
            <FiDownload className="mr-2" />
            Tải vé PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourTicketPage;
