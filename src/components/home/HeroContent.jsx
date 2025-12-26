import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiUsers, FiArrowRight } from 'react-icons/fi';

const HeroContent = () => {
  const navigate = useNavigate();

  const featuredDestinations = [
    {
      name: "Hà Nội",
      image: "https://picsum.photos/300/200?random=100",
      description: "Thủ đô nghìn năm văn hiến"
    },
    {
      name: "Đà Nẵng",
      image: "https://picsum.photos/300/200?random=101",
      description: "Thành phố biển tuyệt đẹp"
    },
    {
      name: "Nha Trang",
      image: "https://picsum.photos/300/200?random=102",
      description: "Thiên đường nghỉ dưỡng"
    }
  ];

  const quickActions = [
    {
      title: "Tour Du Lịch",
      description: "Khám phá các điểm đến hấp dẫn",
      icon: <FiMapPin className="text-2xl" />,
      path: "/tour-listing",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Đặt Vé Máy Bay",
      description: "Bay đến mọi nơi trên thế giới",
      icon: <FiCalendar className="text-2xl" />,
      path: "/flight-listing",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Tour Theo Nhóm",
      description: "Trải nghiệm cùng người bạn đồng hành",
      icon: <FiUsers className="text-2xl" />,
      path: "/tour-listing",
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto text-center space-y-8">
      {/* Brand Title */}
      <div>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg font-serif">
          LIVE AND TRAVEL
        </h1>
        <p className="text-xl md:text-2xl text-white font-light drop-shadow-md">
          Khám phá thiên đường và cõi mộng trong từng hành trình
        </p>
      </div>

      {/* Call to Action */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-border-primary max-w-2xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3">
          Sẵn Sàng Cho Chuyến Đi Của Bạn?
        </h3>
        <p className="text-lg text-text-secondary mb-4">
          Khám phá hàng nghìn tour và vé máy bay với giá tốt nhất
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/tour-listing')}
            className="bg-brand-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-brand-secondary transition-colors"
          >
            Khám Phá Tour
          </button>
          <button
            onClick={() => navigate('/flight-listing')}
            className="bg-white text-text-primary px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors border border-border-primary"
          >
            Tìm Vé Máy Bay
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
