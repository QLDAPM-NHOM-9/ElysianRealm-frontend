import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import TourSearchForm from '../../components/search/TourSearchForm.jsx';
import { FiMapPin, FiClock, FiSearch } from 'react-icons/fi';

// Ảnh nền Hero
const heroImageUrl = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

// Component con: Thẻ Gợi ý Tour
const RecommendationCard = ({ img, title, price, duration }) => (
  <Link to={`/tour-listing?q=${title}`} className="rounded-lg overflow-hidden shadow-sm bg-bg-primary block h-full group">
    <div className="relative overflow-hidden h-48">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="p-4 flex justify-between items-center">
      <div>
        <h4 className="font-semibold text-text-primary truncate">{title}</h4>
        <div className="flex items-center gap-1 text-xs text-text-secondary mt-1">
            <FiClock /> {duration}
        </div>
      </div>
      {price && (
        <span className="font-bold text-brand-primary">${price}</span>
      )}
    </div>
  </Link>
);

// Component con: Thẻ Tìm kiếm gần đây
const RecentSearchCard = ({ img, title, country }) => (
  <Link to={`/tour-listing?q=${title}`} className="flex items-center gap-4 p-3 bg-bg-primary rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <img src={img} alt={title} className="w-16 h-16 rounded-lg object-cover" />
    <div>
      <h4 className="font-semibold text-text-primary">{title}</h4>
      <p className="text-sm text-text-secondary">{country}</p>
    </div>
  </Link>
);

const TourSearchPage = () => {
  const navigate = useNavigate();

  // --- 1. STATE QUẢN LÝ FORM ---
  const [tourData, setTourData] = useState({
    destination: '',
    duration: 'Mọi thời lượng',
    date: '',
    guests: 2
  });

  // --- 2. STATE CHO FILTERS ---
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { key: 'all', label: 'Tất cả', icon: '🌍' },
    { key: 'short', label: '2-3 ngày', icon: '⚡' },
    { key: 'medium', label: '4-7 ngày', icon: '🏖️' },
    { key: 'long', label: '8+ ngày', icon: '🏔️' },
    { key: 'luxury', label: 'Sang trọng', icon: '✨' }
  ];

  // --- 3. HÀM XỬ LÝ TÌM KIẾM ---
  const handleSearch = () => {
    // Tách tên thành phố từ "Da Nang, Vietnam" -> "Da Nang"
    const query = tourData.destination ? tourData.destination.split(',')[0] : '';
    navigate(`/tour-listing?q=${query}`);
  };

  // --- 4. HÀM XỬ LÝ FILTER ---
  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    // Có thể thêm logic để filter tours theo category
    console.log('Filter changed to:', filterKey);
  };

  return (
    <>
      {/* === HERO SECTION === */}
      <section 
        className="h-[550px] w-full bg-cover bg-center relative flex items-center"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg font-serif">
            Khám phá thế giới<br/>theo cách của bạn
          </h1>
          <p className="text-xl text-white font-light drop-shadow-md mb-8">
            Những hành trình tuyệt vời đang chờ đón
          </p>
          
          {/* Form Container */}
          <div className="max-w-6xl bg-white rounded-2xl shadow-xl p-6">
            {/* TRUYỀN PROPS ĐÚNG */}
            <TourSearchForm 
              data={tourData}
              onChange={(field, value) => setTourData({ ...tourData, [field]: value })}
            />

            {/* Nút Tìm kiếm */}
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSearch} className="gap-2 px-8">
                <FiSearch /> Tìm Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* === Your recent searches === */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-text-primary mb-6">Tìm kiếm gần đây</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RecentSearchCard img="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200" title="Istanbul" country="Turkey" />
          <RecentSearchCard img="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9" title="Sydney" country="Australia" />
          <RecentSearchCard img="https://images.unsplash.com/photo-1539650116455-8efdb464717b" title="Baku" country="Azerbaijan" />
          <RecentSearchCard img="https://images.unsplash.com/photo-1514282401047-d79a71a590e8" title="Malé" country="Maldives" />
        </div>
      </section>
      
      {/* === Fall into travel (Tour Gợi ý) === */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-text-primary">Tour nổi bật</h2>
          <Link to="/tour-listing" className="text-brand-primary font-medium hover:underline">
            Xem tất cả
          </Link>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filterOptions.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilterChange(filter.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.key
                  ? 'bg-brand-primary text-white shadow-lg'
                  : 'bg-white text-text-secondary hover:bg-brand-pale hover:text-brand-primary border border-border-primary'
              }`}
            >
              <span>{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RecommendationCard img="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b" title="Đà Nẵng - Hội An" price={350} duration="4N3Đ" />
          <RecommendationCard img="https://images.unsplash.com/photo-1502602898657-3e91760cbb34" title="Paris Mộng Mơ" price={2200} duration="9N8Đ" />
          <RecommendationCard img="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad" title="London Cổ Kính" price={1800} duration="7N6Đ" />
          <RecommendationCard img="https://images.unsplash.com/photo-1528127269322-539801943592" title="Vịnh Hạ Long" price={200} duration="2N1Đ" />
        </div>
      </section>

      {/* === Featured Tour === */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-bg-primary p-8 rounded-lg shadow-sm flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Mùa Thu Nhật Bản</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium bg-brand-pale text-brand-primary py-1 px-3 rounded-full">
                Từ $1500
              </span>
            </div>
            <p className="text-text-secondary mb-6">
              Khám phá cung đường vàng Tokyo - Kyoto - Osaka trong mùa lá đỏ tuyệt đẹp. Trải nghiệm văn hóa trà đạo, tắm Onsen và ẩm thực tinh tế.
            </p>
            <Link to="/tour-listing">
                <Button variant="primary">Đặt Tour Ngay</Button>
            </Link>
          </div>
          <div className="lg:w-2/3 grid grid-cols-2 grid-rows-2 gap-4 h-80">
            <img src="https://images.unsplash.com/photo-1542051841857-5f90071e7989" alt="Japan 1" className="col-span-1 row-span-2 rounded-lg object-cover h-full w-full" />
            <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e" alt="Japan 2" className="col-span-1 row-span-1 rounded-lg object-cover h-full w-full" />
            <img src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d" alt="Japan 3" className="col-span-1 row-span-1 rounded-lg object-cover h-full w-full" />
          </div>
        </div>
      </section>
    </>
  );
};

export default TourSearchPage;
