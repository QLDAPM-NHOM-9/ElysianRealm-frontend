import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingSidebar from '../../components/listings/BookingSidebar.jsx';
import PaymentOptions from '../../components/listings/PaymentOptions.jsx';
import { FiCalendar, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import { bookingService } from '../../services/api.js';

// Component con: Thông tin Tour tóm tắt (Bên trái)
const TourInfoSummary = ({ tour }) => (
  <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary mb-6">
    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={tour.imageUrl}
        alt={tour.title}
        className="w-full md:w-32 h-32 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold text-text-primary mb-2">{tour.title}</h3>
        <div className="flex flex-col gap-2 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <FiMapPin className="text-brand-primary" /> {tour.location}
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="text-brand-primary" /> {tour.duration}
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="text-brand-primary" /> Khởi hành:{' '}
            <span className="font-semibold text-text-primary">{tour.startDate}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-6 pt-6 border-t border-border-primary flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-brand-pale rounded-full text-brand-primary">
          <FiUsers />
        </div>
        <div>
          <p className="text-sm text-text-secondary">Số lượng khách</p>
          <p className="font-semibold text-text-primary">2 Người lớn</p>
        </div>
      </div>
      <button className="text-brand-primary text-sm font-medium hover:underline">
        Thay đổi
      </button>
    </div>
  </div>
);

const TourBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Lấy data tour từ state truyền qua
  const tourData = location.state?.tour;

  if (!tourData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-text-secondary text-lg">
          Không tìm thấy thông tin tour. Vui lòng quay lại và chọn tour.
        </p>
      </div>
    );
  }

  // Dữ liệu cho Sidebar
  const orderDetails = {
    title: tourData.title,
    subTitle: `${tourData.duration} • 2 Khách`,
    imageUrl: tourData.imageUrl,
  };

  const priceDetails = {
    base: tourData.price * 2, // 2 khách
    discount: 0,
    taxes: 20,
    serviceFee: 10,
    total: tourData.price * 2 + 20 + 10,
  };

  /**
   * Handle booking submission
   */
  const handleBooking = async (paymentData) => {
    setIsProcessing(true);
    setError('');

    try {
      const bookingData = {
        type: 'tour',
        itemId: tourData.id,
        guests: 2,
        date: new Date().toISOString().split('T')[0],
        paymentMethod: paymentData.method,
      };

      const response = await bookingService.create(bookingData);
      console.log('Tour Booking success:', response);

      // Navigate to booking confirmation or history
      navigate('/account/history', {
        state: {
          bookingId: response.id,
          message: 'Đặt tour thành công!',
        },
      });
    } catch (err) {
      const message =
        err.message || 'Đặt tour thất bại. Vui lòng kiểm tra thông tin và thử lại.';
      setError(message);
      console.error('Booking failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8 font-serif">
        Xác nhận đặt Tour
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cột trái: Thông tin & Thanh toán */}
        <main className="flex-1 space-y-6">
          <TourInfoSummary tour={tourData} />

          <PaymentOptions
            onSubmit={handleBooking}
            isProcessing={isProcessing}
          />
        </main>

        {/* Cột phải: Sidebar Tóm tắt giá */}
        <BookingSidebar
          orderDetails={orderDetails}
          priceDetails={priceDetails}
        />
      </div>
    </div>
  );
};

export default TourBookingPage;