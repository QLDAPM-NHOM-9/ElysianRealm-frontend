import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiChevronRight, FiHeart, FiShare2, FiStar, FiMapPin, FiUser, FiWifi, FiCoffee, FiWind, FiTv } from 'react-icons/fi';
import Button from '../../components/common/Button.jsx';

// Ảnh mẫu (Bạn sẽ thay bằng dữ liệu thật)
const images = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbFEeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1496417263034-38ec4f096c01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1445019980597-93addde0f04a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
];

// Component con: Tiện ích
const Amenity = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 flex items-center justify-center bg-brand-pale text-brand-primary rounded-lg">
      {icon}
    </div>
    <span className="text-text-secondary">{text}</span>
  </div>
);

// Component con: Thẻ phòng
const RoomCard = ({ title, price }) => (
  <div className="flex items-center justify-between p-4 border border-border-primary rounded-lg shadow-sm">
    <div className="flex items-center gap-4">
      <img src="https://via.placeholder.com/64" alt="room" className="w-16 h-16 rounded-lg object-cover" />
      <div>
        <h5 className="font-bold text-text-primary">{title}</h5>
        <p className="text-sm text-text-secondary">2 Guests</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xl font-bold text-brand-secondary">${price}<span className="text-sm font-normal text-text-secondary">/night</span></p>
      <Button variant="secondary" className="px-4 py-2 text-sm mt-1">Book now</Button>
    </div>
  </div>
);

// Component con: Thẻ review
const ReviewCard = ({ user, text, rating }) => (
  <div className="border-b border-border-primary py-4">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-3">
        <img src="https://via.placeholder.com/40" alt={user} className="w-10 h-10 rounded-full" />
        <div>
          <h5 className="font-semibold text-text-primary">{user}</h5>
          <p className="text-sm text-text-secondary">15 July 2022</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-sm font-medium bg-brand-primary text-white py-1 px-2 rounded">
        {rating} <FiStar className="w-3 h-3 fill-current" />
      </div>
    </div>
    <p className="text-text-secondary">{text}</p>
  </div>
);


const HotelDetailPage = () => {
  const { id } = useParams(); // Lấy ID khách sạn từ URL

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header trang (Tên, Nút) */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">CVK Park Bosphorus Hotel Istanbul</h1>
          <div className="flex items-center gap-2 text-text-secondary mt-2">
            <FiMapPin className="w-4 h-4" />
            <span>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</span>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Button variant="outline" isIconOnly={true} className="w-12 h-12 rounded-lg"><FiShare2 /></Button>
          <Button variant="primary" className="px-6 h-12 rounded-lg">Book now</Button>
        </div>
      </div>

      {/* Grid Ảnh */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[450px] rounded-2xl overflow-hidden shadow-lg mb-8">
        <div className="col-span-2 row-span-2">
          <img src={images[0]} alt="Main" className="w-full h-full object-cover" />
        </div>
        <div><img src={images[1]} alt="Sub" className="w-full h-full object-cover" /></div>
        <div><img src={images[2]} alt="Sub" className="w-full h-full object-cover" /></div>
        <div><img src={images[3]} alt="Sub" className="w-full h-full object-cover" /></div>
        <div><img src={images[4]} alt="Sub" className="w-full h-full object-cover" /></div>
      </div>

      {/* Phần Overview & Tiện ích */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Cột trái: Overview & Tiện ích */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-text-primary mb-4">Overview</h3>
          <p className="text-text-secondary mb-6">
            Located in Taksim Gümü??uyu, the heart of Istanbul, the CVK Park Bosphorus Hotel Istanbul has risen from the ashes of the historic "Park Hotel"...
          </p>
          <div className="p-4 bg-brand-pale rounded-lg flex items-center justify-around mb-8">
            <span className="flex items-center gap-1 font-medium text-brand-primary">4.2 <FiStar /></span>
            <span className="font-medium text-text-secondary">Very Good</span>
            <span className="text-text-secondary">54 reviews</span>
          </div>

          <h3 className="text-2xl font-bold text-text-primary mb-6">Amenities</h3>
          <div className="grid grid-cols-2 gap-4">
            <Amenity icon={<FiWifi />} text="Free Wifi" />
            <Amenity icon={<FiCoffee />} text="Coffee" />
            <Amenity icon={<FiWind />} text="Air conditioning" />
            <Amenity icon={<FiTv />} text="Television" />
            {/* Thêm tiện ích khác */}
          </div>
        </div>
        
        {/* Cột phải: Bản đồ */}
        <div className="bg-gray-200 rounded-lg h-96 lg:h-full flex items-center justify-center text-text-secondary">
          Map Placeholder
        </div>
      </div>

      {/* Phần Available Rooms */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-6">Available Rooms</h3>
        <div className="space-y-4">
          <RoomCard title="Superior room - 1 double bed or 2 twin beds" price={240} />
          <RoomCard title="Deluxe room - 1 king bed" price={280} />
          <RoomCard title="Suite - 1 king bed and 1 sofa bed" price={350} />
        </div>
      </div>

      {/* Phần Reviews */}
      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-4">Reviews</h3>
        <ReviewCard user="John Doe" rating={4.2} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        <ReviewCard user="Jane Smith" rating={5.0} text="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <ReviewCard user="Mike Johnson" rating={3.8} text="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
      </div>
    </div>
  );
};

export default HotelDetailPage;