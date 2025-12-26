import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import FlightSearchForm from '../../components/search/FlightSearchForm.jsx';
import { FiSend } from 'react-icons/fi';

// Ảnh nền Hero
const heroImageUrl = "https://images.unsplash.com/photo-1544015639-2a96b6b77f11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

// Component con: Thẻ Gợi ý
const RecommendationCard = ({ img, title, price }) => (
  <Link to={`/flight-listing?q=${title}`} className="rounded-lg overflow-hidden shadow-sm bg-bg-primary block h-full group">
    <div className="overflow-hidden h-48">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="p-4 flex justify-between items-center">
      <div>
        <h4 className="font-semibold text-text-primary">{title}</h4>
        <p className="text-sm text-text-secondary">Book a flight</p>
      </div>
      {price && (
        <span className="font-bold text-brand-primary">${price}</span>
      )}
    </div>
  </Link>
);

const FlightSearchPage = () => {
  const navigate = useNavigate();

  // --- 1. STATE QUẢN LÝ FORM ---
  const [searchData, setSearchData] = useState({
    from: '', 
    to: '', 
    tripType: 'Return', 
    departDate: '', 
    returnDate: '', 
    passengers: 1, 
    classType: 'Economy'
  });

  // --- 2. HÀM XỬ LÝ TÌM KIẾM ---
  const handleSearch = () => {
    // Lấy điểm đến (to) để làm từ khóa tìm kiếm
    const query = searchData.to || '';
    navigate(`/flight-listing?q=${query}`);
  };

  return (
    <>
      {/* === HERO SECTION === */}
      <section 
        className="h-[550px] w-full bg-cover bg-center relative flex items-center"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg font-serif">
            Make your travel<br/>whishlist, we’ll do the rest
          </h1>
          <p className="text-xl text-white font-light drop-shadow-md mb-8">
            Special offers to suit your plan
          </p>
          
          {/* Form Container */}
          <div className="max-w-6xl bg-white rounded-2xl shadow-xl p-6">
            {/* TRUYỀN PROPS ĐÚNG */}
            <FlightSearchForm 
              data={searchData}
              onChange={(field, value) => setSearchData({ ...searchData, [field]: value })}
            />
            
            {/* Nút Tìm kiếm */}
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSearch} className="gap-2 px-8">
                <FiSend /> Show Flights
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* === Let's go places together === */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-text-primary">Let's go places together</h2>
          <Link to="/flight-listing" className="text-brand-primary font-medium hover:underline">
            See all
          </Link>
        </div>
        <p className="text-text-secondary mb-8">Discover the latest offers and news and start planning your next trip with us.</p>
        
        {/* Interactive Map Placeholder */}
        <div className="h-72 bg-gradient-to-br from-brand-pale to-brand-primary/20 rounded-lg border-2 border-dashed border-brand-primary/30 flex items-center justify-center relative overflow-hidden group cursor-pointer">
          <div className="text-center text-brand-primary z-10">
            <div className="text-4xl mb-2">🗺️</div>
            <h3 className="text-xl font-bold mb-1">Khám phá điểm đến</h3>
            <p className="text-sm opacity-80">Tương tác với bản đồ để tìm chuyến bay</p>
          </div>
          <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-brand-primary/10 transition-colors duration-300" />
          <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
      </section>

      {/* === Fall into travel === */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-text-primary">Fall into travel</h2>
          <Link to="/flight-listing" className="text-brand-primary font-medium hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RecommendationCard img="https://images.unsplash.com/photo-1514214246283-efbb2752a780" title="Melbourne" price={700} />
          <RecommendationCard img="https://images.unsplash.com/photo-1502602898657-3e91760cbb34" title="Paris" price={600} />
          <RecommendationCard img="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad" title="London" price={350} />
          <RecommendationCard img="https://images.unsplash.com/photo-1583531352515-8884af319dc1" title="Columbia" price={700} />
        </div>
      </section>

      {/* === Backpacking Sri Lanka === */}
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
              Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home.
            </p>
            <Link to="/flight-listing">
              <Button variant="primary">Book Flight</Button>
            </Link>
          </div>
          <div className="lg:w-2/3 grid grid-cols-2 grid-rows-2 gap-4 h-80">
            <img src="https://images.unsplash.com/photo-1586796676762-2309e3a3e66a" alt="Sri Lanka 1" className="col-span-1 row-span-2 rounded-lg object-cover h-full w-full" />
            <img src="https://images.unsplash.com/photo-1546522933-288277274075" alt="Sri Lanka 2" className="col-span-1 row-span-1 rounded-lg object-cover h-full w-full" />
            <img src="https://images.unsplash.com/photo-1588258219511-64eb629cb833" alt="Sri Lanka 3" className="col-span-1 row-span-1 rounded-lg object-cover h-full w-full" />
          </div>
        </div>
      </section>
    </>
  );
};

export default FlightSearchPage;
