import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiChevronRight, FiHeart, FiShare2, FiStar, FiWifi, FiCoffee, FiBatteryCharging, FiHeadphones, FiCheckCircle } from 'react-icons/fi';
import Button from '../../components/common/Button.jsx';

// Ảnh mẫu (Bạn sẽ thay bằng dữ liệu thật)
const flightImageUrl = "https://images.unsplash.com/photo-1569700340723-6c813133b3b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

// Component con: Breadcrumbs
const Breadcrumbs = () => (
  <nav className="flex items-center text-sm text-text-secondary mb-4">
    <Link to="/" className="hover:underline">Turkey</Link>
    <FiChevronRight className="mx-1" />
    <Link to="#" className="hover:underline">Istanbul</Link>
    <FiChevronRight className="mx-1" />
    <span className="text-text-primary font-medium">Tour Detail</span>
  </nav>
);

// Component con: Thẻ tiện ích
const FeatureCard = ({ icon, title, img }) => (
  <div className="rounded-lg shadow-sm border border-border-primary overflow-hidden">
    <img src={img} alt={title} className="w-full h-32 object-cover" />
    <div className="p-4">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium text-text-primary">{title}</span>
      </div>
    </div>
  </div>
);

// Component con: Thẻ chi tiết chặng bay
const FlightLegCard = ({ time, airline, aircraft }) => (
  <div className="bg-bg-primary rounded-lg shadow-sm border border-border-primary p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold text-text-primary">Return Wed, Dec 8</h3>
      <span className="text-text-secondary">2h 28m</span>
    </div>
    
    <div className="flex justify-between items-center">
      {/* Cất cánh */}
      <div className="text-left">
        <img src="https" alt={airline} className="h-8 mb-2" />
        <p className="text-2xl font-semibold text-text-primary">12:00 pm</p>
        <p className="text-text-secondary">{airline}</p>
        <p className="text-text-secondary">{aircraft}</p>
      </div>
      
      {/* Các icon tiện ích */}
      <div className="flex gap-4 text-text-secondary">
        <FiWifi />
        <FiCoffee />
        <FiBatteryCharging />
        <FiHeadphones />
      </div>

      {/* Hạ cánh */}
      <div className="text-right">
        <p className="text-2xl font-semibold text-text-primary">02:28 pm</p>
        <p className="text-text-secondary">Newark(EWR)</p>
      </div>
    </div>
  </div>
);

const FlightDetailPage = () => {
  // Lấy :id từ URL, ví dụ: /flight-detail/123
  const { id } = useParams(); 

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Breadcrumbs />

      {/* Header trang */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Emirates A380 Airbus</h1>
          <div className="flex items-center gap-2 text-text-secondary mt-2">
            <FiMapPin className="w-4 h-4" />
            <span>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</span>
            <span className="flex items-center gap-1 text-sm font-medium text-brand-primary ml-2">
              4.2 <FiStar className="w-3 h-3 fill-current" />
            </span>
            <span className="text-sm text-text-secondary">(54 reviews)</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-3xl font-bold text-brand-secondary">$240</p>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" isIconOnly={true} className="w-12 h-12 rounded-lg"><FiHeart /></Button>
            <Button variant="outline" isIconOnly={true} className="w-12 h-12 rounded-lg"><FiShare2 /></Button>
            <Button variant="primary" className="px-6 h-12 rounded-lg">Book now</Button>
          </div>
        </div>
      </div>

      {/* Ảnh chính */}
      <img src={flightImageUrl} alt="Emirates A380" className="w-full h-96 object-cover rounded-2xl shadow-lg mb-8" />

      {/* Tiện ích */}
      <h3 className="text-2xl font-bold text-text-primary mb-4">Basic Economy Features</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Dữ liệu mẫu */}
        <FeatureCard icon={<FiHeadphones />} title="In-flight Etertainment" img="https://via.placeholder.com/200x150" />
        <FeatureCard icon={<FiCoffee />} title="In-flight Etertainment" img="https://via.placeholder.com/200x150" />
        <FeatureCard icon={<FiWifi />} title="In-flight Etertainment" img="https://via.placeholder.com/200x150" />
        <FeatureCard icon={<FiBatteryCharging />} title="In-flight Etertainment" img="https://via.placeholder.com/200x150" />
      </div>

      {/* Chính sách */}
      <h3 className="text-2xl font-bold text-text-primary mb-4">Emirates Airlines Policies</h3>
      <div className="bg-brand-pale text-brand-primary p-6 rounded-lg flex gap-4 items-center mb-8">
        <FiCheckCircle className="w-6 h-6 flex-shrink-0" />
        <p>Pre-flight cleaning, installation of cabin HEPA filters. Pre-flight health screening questions.</p>
      </div>
      
      {/* Chi tiết chặng bay */}
      <div className="space-y-6">
        <FlightLegCard airline="Emirates" aircraft="Airbus A320" />
        <FlightLegCard airline="Emirates" aircraft="Airbus A320" />
      </div>
    </div>
  );
};

export default FlightDetailPage;