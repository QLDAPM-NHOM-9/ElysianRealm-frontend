import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingSidebar from '../../components/listings/BookingSidebar.jsx';
import PaymentOptions from '../../components/listings/PaymentOptions.jsx';
import { FiWifi, FiCoffee, FiBatteryCharging, FiHeadphones } from 'react-icons/fi';
import { bookingService } from '../../services/api.js';

// Component con: Chi tiết chặng bay
const FlightLegCard = ({ time, airline, aircraft }) => (
  <div className="bg-bg-primary rounded-lg shadow-sm border border-border-primary p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold text-text-primary">Return Wed, Dec 8</h3>
      <span className="text-text-secondary">2h 28m</span>
    </div>
    <div className="flex justify-between items-center">
      <div className="text-left">
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg" alt={airline} className="h-8 mb-2" />
        <p className="text-2xl font-semibold text-text-primary">12:00 pm</p>
        <p className="text-text-secondary">{airline}</p>
        <p className="text-text-secondary">{aircraft}</p>
      </div>
      <div className="flex gap-4 text-text-secondary">
        <FiWifi /><FiCoffee /><FiBatteryCharging /><FiHeadphones />
      </div>
      <div className="text-right">
        <p className="text-2xl font-semibold text-text-primary">02:28 pm</p>
        <p className="text-text-secondary">Newark(EWR)</p>
      </div>
    </div>
  </div>
);

// --- COMPONENT CHÍNH ---
const FlightBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get flight data from route state
  const flightData = location.state?.flight || {};

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

  // Hàm xử lý đặt vé
  const handleBooking = async () => {
    setIsProcessing(true);
    try {
      // Prepare booking data from flight info
      const newBookingData = {
        type: 'flight',
        itemId: flightData.id,
        date: new Date().toISOString().split('T')[0],
        guests: 1,
        paymentMethod: 'credit_card',
        details: {
          from: flightData.from || 'Unknown',
          to: flightData.to || 'Unknown',
          airline: flightData.airline || 'Unknown',
          flightNumber: flightData.flightNumber || 'N/A',
          time: `${flightData.departureTime || ''} — ${flightData.arrivalTime || ''}`,
          img: flightData.logoUrl || 'https://via.placeholder.com/50'
        }
      };

      // 2. Gọi API tạo đơn hàng
      const createdBooking = await bookingService.create(newBookingData);
      console.log('Booking success:', createdBooking);

      // 3. Chuyển hướng đến trang vé hoặc lịch sử
      // (Ở đây ta chuyển đến trang History để thấy kết quả)
      navigate('/account/history');

    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to process booking. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cột trái: Chi tiết và Thanh toán */}
        <main className="flex-1 space-y-6">
          <FlightLegCard airline="Emirates" aircraft="Airbus A320" />
          
          {/* Truyền hàm xử lý và trạng thái loading xuống PaymentOptions */}
          <PaymentOptions 
            onSubmit={handleBooking} 
            isProcessing={isProcessing}
          />
        </main>

        {/* Cột phải: Sidebar */}
        <BookingSidebar 
          orderDetails={orderDetails}
          priceDetails={priceDetails}
        />

      </div>
    </div>
  );
};

export default FlightBookingPage;