import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiUsers, FiArrowRight } from 'react-icons/fi';

const InteractiveSection = () => {
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
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="space-y-16">

        {/* Quick Action Buttons */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-12">
            Khám phá các lựa chọn du lịch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className={`${action.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-left group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 bg-white/20 rounded-lg">
                    {action.icon}
                  </div>
                  <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Destinations */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-12">
            Điểm Đến Nổi Bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredDestinations.map((destination, index) => (
              <div
                key={index}
                onClick={() => navigate(`/tour-listing?q=${destination.name}`)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all transform group-hover:scale-105">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
                    <p className="text-sm text-gray-200">{destination.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default InteractiveSection;
