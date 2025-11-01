import React from 'react';
import BookingSidebar from '../../components/listings/BookingSidebar.jsx'; // TÁI SỬ DỤNG
import PaymentOptions from '../../components/listings/PaymentOptions.jsx'; // TÁI SỬ DỤNG
import { FiCalendar, FiChevronRight } from 'react-icons/fi';

// Component con: Chỉ hiển thị thông tin phòng đã chọn
const RoomInfoCard = () => (
  <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary mb-6">
    <h3 className="text-xl font-bold text-text-primary mb-4">Superior room - 1 double bed or 2 twin beds</h3>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      {/* Check-in */}
      <div className="flex-1">
        <p className="text-sm text-text-secondary">Check-in</p>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-brand-primary" />
          <span className="text-lg font-semibold text-text-primary">Thursday, Dec 8</span>
        </div>
      </div>

      <FiChevronRight className="my-2 sm:my-0 sm:mx-4" />

      {/* Check-out */}
      <div className="flex-1">
        <p className="text-sm text-text-secondary">Check-out</p>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-brand-primary" />
          <span className="text-lg font-semibold text-text-primary">Friday, Dec 9</span>
        </div>
      </div>
    </div>
  </div>
);

// Dữ liệu mẫu (Cho Sidebar)
const orderDetails = {
  title: "CVK Park Bosphorus...",
  subTitle: "Superior room - 1 double bed",
  imageUrl: "https://via.placeholder.com/112x80/E0BBE4/FFFFFF?text=Hotel"
};

const priceDetails = {
  base: 240,
  discount: 0,
  taxes: 20,
  serviceFee: 5,
  total: 265
};

const HotelBookingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cột trái: Chi tiết và Thanh toán */}
        <main className="flex-1 space-y-6">
          {/* Component mới hiển thị phòng */}
          <RoomInfoCard />

          {/* Component tái sử dụng */}
          <PaymentOptions />
          
          {/* (Phần "Login or Sign up" có thể thêm ở đây) */}
        </main>

        {/* Cột phải: Sidebar (Tái sử dụng) */}
        <BookingSidebar 
          orderDetails={orderDetails}
          priceDetails={priceDetails}
        />

      </div>
    </div>
  );
};

export default HotelBookingPage;