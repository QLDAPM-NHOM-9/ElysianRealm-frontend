import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import HotelSearchForm from '../../components/search/HotelSearchForm.jsx'; // TÁI SỬ DỤNG
import { FiArrowRight } from 'react-icons/fi';

// Ảnh nền Hero (Bạn có thể thay đổi)
const heroImageUrl = "https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80";

// Component con: Thẻ Gợi ý
const RecommendationCard = ({ img, title, price }) => (
  <Link to="#" className="rounded-lg overflow-hidden shadow-sm bg-bg-primary">
    <img src={img} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4 flex justify-between items-center">
      <div>
        <h4 className="font-semibold text-text-primary">{title}</h4>
        <p className="text-sm text-text-secondary">Book a stay</p>
      </div>
      {price && (
        <span className="font-bold text-brand-primary">${price}</span>
      )}
    </div>
  </Link>
);

// Component con: Thẻ Tìm kiếm gần đây
const RecentSearchCard = ({ img, title, country }) => (
  <Link to="#" className="flex items-center gap-4 p-3 bg-bg-primary rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <img src={img} alt={title} className="w-16 h-16 rounded-lg object-cover" />
    <div>
      <h4 className="font-semibold text-text-primary">{title}</h4>
      <p className="text-sm text-text-secondary">{country}</p>
    </div>
  </Link>
);

const HotelSearchPage = () => {
  return (
    <>
      {/* === HERO SECTION === */}
      <section 
        className="h-[450px] w-full bg-cover bg-center relative flex items-center"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Chạm đến kỳ nghỉ mộng mơ
          </h1>
          <p className="text-xl text-white font-light drop-shadow-md mb-8">
            Ưu đãi lưu trú dành riêng cho bạn
          </p>
          
          {/* Tái sử dụng Form Tìm kiếm Khách sạn */}
          <div className="max-w-6xl">
            <HotelSearchForm />
          </div>
        </div>
      </section>

      {/* === Your recent searches === */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-text-primary mb-6">Your recent searches</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RecentSearchCard img="https://via.placeholder.com/100" title="Istanbul" country="Turkey" />
          <RecentSearchCard img="https://via.placeholder.com/100" title="Sydney" country="Australia" />
          <RecentSearchCard img="https://via.placeholder.com/100" title="Baku" country="Azerbaijan" />
          <RecentSearchCard img="https://via.placeholder.com/100" title="Malé" country="Maldives" />
        </div>
      </section>
      
      {/* === Fall into travel === */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-text-primary">Fall into travel</h2>
          <Link to="#" className="text-brand-primary font-medium hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RecommendationCard img="https://via.placeholder.com/300x200" title="Melbourne" price={700} />
          <RecommendationCard img="https://via.placeholder.com/300x200" title="Paris" price={600} />
          <RecommendationCard img="https://via.placeholder.com/300x200" title="London" price={350} />
          <RecommendationCard img="https://via.placeholder.com/300x200" title="Columbia" price={700} />
        </div>
      </section>

      {/* === Backpacking Sri Lanka === */}
      {/* (Phần này giống hệt trang FlightSearch, có thể tái sử dụng) */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-bg-primary p-8 rounded-lg shadow-sm flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Backpacking Sri Lanka</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium bg-brand-pale text-brand-primary py-1 px-3 rounded-full">
                From $700
              </span>
            </div>
            <p className="text-text-secondary mb-6">
              Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life...
            </p>
            <Button variant="primary">Book Stay</Button>
          </div>
          <div className="lg:w-2/3 grid grid-cols-2 grid-rows-2 gap-4 h-80">
            <img src="https://via.placeholder.com/400x300" alt="Sri Lanka 1" className="col-span-1 row-span-2 rounded-lg object-cover h-full" />
            <img src="https://via.placeholder.com/300x200" alt="Sri Lanka 2" className="col-span-1 row-span-1 rounded-lg object-cover h-full" />
            <img src="https://via.placeholder.com/300x200" alt="Sri Lanka 3" className="col-span-1 row-span-1 rounded-lg object-cover h-full" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelSearchPage;