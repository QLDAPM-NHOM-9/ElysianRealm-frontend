import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingSidebar from '../../components/listings/BookingSidebar.jsx';
import PaymentOptions from '../../components/listings/PaymentOptions.jsx';
import { FiWifi, FiCoffee, FiBatteryCharging, FiHeadphones } from 'react-icons/fi';
import { bookingService } from '../../services/api.js';
import toast from 'react-hot-toast';

// Component con: Chi tiết chặng bay
const FlightLegCard = ({ flightData }) => {
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-bg-primary rounded-lg shadow-sm border border-border-primary p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-text-primary">
          {flightData.departureTime ? formatDate(flightData.departureTime) : 'Flight Date'}
        </h3>
        <span className="text-text-secondary">
          {flightData.duration ? formatDuration(flightData.duration) : 'Duration'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-left">
          <img
            src={flightData.logoUrl || "https://via.placeholder.com/50"}
            alt={flightData.airline || "Airline"}
            className="h-8 mb-2"
          />
          <p className="text-2xl font-semibold text-text-primary">
            {flightData.departureTime ? formatTime(flightData.departureTime) : 'Departure'}
          </p>
          <p className="text-text-secondary">{flightData.airline || 'Airline'}</p>
          <p className="text-text-secondary">{flightData.flightNumber || 'Flight Number'}</p>
        </div>
        <div className="flex gap-4 text-text-secondary">
          <FiWifi /><FiCoffee /><FiBatteryCharging /><FiHeadphones />
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-text-primary">
            {flightData.arrivalTime ? formatTime(flightData.arrivalTime) : 'Arrival'}
          </p>
          <p className="text-text-secondary">{flightData.to || 'Destination'}</p>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT CHÍNH ---
const FlightBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  // Get flight data from route state
  const flightData = location.state?.flight || {};

  // If no flight data, redirect back to flight listing
  React.useEffect(() => {
    if (!flightData.id) {
      toast.error('Không tìm thấy thông tin chuyến bay. Vui lòng chọn chuyến bay trước.');
      navigate('/flight-listing');
    }
  }, [flightData.id, navigate]);

  // Calculate order details from flight data
  const orderDetails = {
    title: flightData.airline || "Flight Booking",
    subTitle: flightData.duration || "Duration not available",
    imageUrl: flightData.logoUrl || "https://images.unsplash.com/photo-1569700340723-6c813133b3b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  };

  const priceDetails = {
    base: flightData.price || 400,
    discount: 0,
    taxes: Math.round((flightData.price || 400) * 0.025),
    serviceFee: 10,
    total: (flightData.price || 400) + Math.round((flightData.price || 400) * 0.025) + 10,
  };

  // Hàm xử lý đặt vé - tạo booking first
  const handleCreateBooking = async () => {
    setIsProcessing(true);
    try {
      // Prepare booking data from flight info
      const departureDate = flightData.departureTime
        ? new Date(flightData.departureTime).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      const newBookingData = {
        type: 'FLIGHT',
        itemId: flightData.id,
        date: departureDate,
        guests: 1,
        paymentMethod: 'pending', // Will be updated after payment
        paymentCompleted: false,
        details: JSON.stringify({
          from: flightData.from || 'Unknown',
          to: flightData.to || 'Unknown',
          airline: flightData.airline || 'Unknown',
          flightNumber: flightData.flightNumber || 'N/A',
          time: `${flightData.departureTime || ''} — ${flightData.arrivalTime || ''}`,
          duration: flightData.duration || 0,
          img: flightData.logoUrl || 'https://via.placeholder.com/50'
        })
      };

      // Create booking
      const createdBooking = await bookingService.create(newBookingData);
      
      // Store booking ID for payment processing
      if (createdBooking && createdBooking.id) {
        setBookingId(createdBooking.id);
        toast.success('Đã tạo vé, vui lòng chọn phương thức thanh toán');
      }

    } catch (error) {
      console.error('Booking failed:', error);
      toast.error('Không thể đặt vé. Vui lòng thử lại.');
      setIsProcessing(false);
    }
  };

  // Callback xử lý khi user chọn phương thức thanh toán
  const handlePaymentSubmit = async (paymentData) => {
    try {
      setIsProcessing(true);
      
      if (paymentData.method === 'vnpay') {
        // VNPay will be handled by PaymentOptions, just navigate after
        toast.success('Đang chuyển hướng đến VNPay...');
      } else if (paymentData.method === 'cash') {
        // Cash payment
        toast.success('Đơn hàng đã được tạo. Vui lòng thanh toán tại quầy.');
        setTimeout(() => {
          navigate('/account/history');
        }, 2000);
      }
    } catch (error) {
      console.error('Payment handling failed:', error);
      toast.error('Lỗi xử lý thanh toán. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cột trái: Chi tiết và Thanh toán */}
        <main className="flex-1 space-y-6">
          <FlightLegCard flightData={flightData} />
          
          {/* Nếu chưa có booking, show button để tạo booking */}
          {!bookingId ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={handleCreateBooking}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isProcessing ? 'Đang xử lý...' : 'Xác nhận và chọn phương thức thanh toán'}
              </button>
            </div>
          ) : (
            /* Sau khi có booking, hiển thị payment options */
            <PaymentOptions
              onSubmit={handlePaymentSubmit}
              isProcessing={isProcessing}
              total={priceDetails.total}
              type="flight"
              bookingId={bookingId}
            />
          )}
        </main>

        {/* Cột phải: Sidebar */}
        <BookingSidebar
          orderDetails={orderDetails}
          priceDetails={priceDetails}
          showReviews={false}
        />

      </div>
    </div>
  );
};

export default FlightBookingPage;
