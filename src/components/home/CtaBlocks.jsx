import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const flightsImg = "https://images.unsplash.com/photo-1570715750330-69a04f959d88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80";
// Ảnh mới cho Tour (Leo núi/Khám phá)
const toursImg = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80";

const CtaBlocks = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Khối Flights */}
        <div 
          className="h-80 bg-cover bg-center rounded-lg shadow-lg relative p-8 flex flex-col justify-end items-start group overflow-hidden" 
          style={{ backgroundImage: `url(${flightsImg})` }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-lg transition-colors group-hover:bg-black/50"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-bold text-white mb-2 font-serif">Chuyến bay</h3>
            <p className="text-white mb-4">Tìm vé máy bay giá tốt nhất cho hành trình của bạn.</p>
            <Link 
              to="/flights" 
              className="bg-bg-primary text-text-primary font-medium py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              Đặt vé ngay <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Khối Tours (ĐÃ SỬA) */}
        <div 
          className="h-80 bg-cover bg-center rounded-lg shadow-lg relative p-8 flex flex-col justify-end items-start group overflow-hidden" 
          style={{ backgroundImage: `url(${toursImg})` }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-lg transition-colors group-hover:bg-black/50"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-bold text-white mb-2 font-serif">Tour Du Lịch</h3>
            <p className="text-white mb-4">Khám phá những vùng đất mới và trải nghiệm văn hóa.</p>
            <Link 
              to="/tours" // Link tới trang tìm kiếm Tour
              className="bg-bg-primary text-text-primary font-medium py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              Đặt Tour ngay <FiArrowRight />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CtaBlocks;