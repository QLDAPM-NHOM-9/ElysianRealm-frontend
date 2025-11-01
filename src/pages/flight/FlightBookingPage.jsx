import React from 'react';
import BookingSidebar from '../../components/listings/BookingSidebar.jsx';
import PaymentOptions from '../../components/listings/PaymentOptions.jsx';
import { FiWifi, FiCoffee, FiBatteryCharging, FiHeadphones } from 'react-icons/fi';

// Tái sử dụng FlightLegCard (Bạn có thể tách ra file riêng nếu muốn)
const FlightLegCard = ({ time, airline, aircraft }) => (
  <div className="bg-bg-primary rounded-lg shadow-sm border border-border-primary p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold text-text-primary">Return Wed, Dec 8</h3>
      <span className="text-text-secondary">2h 28m</span>
    </div>
    <div className="flex justify-between items-center">
      <div className="text-left">
        <img src="https" alt={airline} className="h-8 mb-2" />
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

// Dữ liệu mẫu
const orderDetails = {
  title: "Emirates A380 Airbus",
  subTitle: "Economy",
  imageUrl: "https://via.placeholder.com/112x80"
};

const priceDetails = {
  base: 400,
  discount: 20,
  taxes: 10,
  serviceFee: 10,
  total: 400
};

const FlightBookingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cột trái: Chi tiết và Thanh toán */}
        <main className="flex-1 space-y-6">
          <FlightLegCard airline="Emirates" aircraft="Airbus A320" />
          <PaymentOptions />
          
          {/* (Phần "Login or Sign up" có thể thêm ở đây nếu chưa đăng nhập) */}
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