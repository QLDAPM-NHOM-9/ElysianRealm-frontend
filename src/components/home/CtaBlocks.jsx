import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

// Đường dẫn ảnh (bạn có thể thay bằng ảnh của mình)
const flightsImg = "https://images.unsplash.com/photo-1570715750330-69a04f959d88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
const hotelsImg = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

const CtaBlocks = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Khối Flights */}
        <div 
          className="h-80 bg-cover bg-center rounded-lg shadow-lg relative p-8 flex flex-col justify-end items-start" 
          style={{ backgroundImage: `url(${flightsImg})` }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-bold text-white mb-2">Flights</h3>
            <p className="text-white mb-4">Search Flights & Places to stay.</p>
            <Link 
              to="/flights" 
              className="bg-bg-primary text-text-primary font-medium py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              Show Flights <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Khối Hotels */}
        <div 
          className="h-80 bg-cover bg-center rounded-lg shadow-lg relative p-8 flex flex-col justify-end items-start" 
          style={{ backgroundImage: `url(${hotelsImg})` }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-bold text-white mb-2">Hotels</h3>
            <p className="text-white mb-4">Search hotels & Places to stay.</p>
            <Link 
              to="/hotels" 
              className="bg-bg-primary text-text-primary font-medium py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              Show Hotels <FiArrowRight />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CtaBlocks;