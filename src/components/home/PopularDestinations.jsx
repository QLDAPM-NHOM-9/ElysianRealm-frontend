import React from 'react';
import { Link } from 'react-router-dom';

// Dữ liệu mẫu (Bạn có thể thay bằng dữ liệu từ API sau)
const destinations = [
  { img: 'https://via.placeholder.com/300x200/E0BBE4/FFFFFF?text=Istanbul', title: 'Istanbul, Turkey', tags: 'Flights • Hotels • Resorts' },
  { img: 'https://via.placeholder.com/300x200/F472B6/FFFFFF?text=Sydney', title: 'Sydney, Australia', tags: 'Flights • Hotels • Resorts' },
  { img: 'https://via.placeholder.com/300x200/E0BBE4/FFFFFF?text=Baku', title: 'Baku, Azerbaijan', tags: 'Flights • Hotels • Resorts' },
  { img: 'https://via.placeholder.com/300x200/F472B6/FFFFFF?text=Male', title: 'Malé, Maldives', tags: 'Flights • Hotels • Resorts' },
  { img: 'https://via.placeholder.com/300x200/E0BBE4/FFFFFF?text=Paris', title: 'Paris, France', tags: 'Flights • Hotels • Resorts' },
  { img: 'https://via.placeholder.com/300x200/F472B6/FFFFFF?text=New+York', title: 'New York, US', tags: 'Flights • Hotels • Resorts' },
  { img: 'https://via.placeholder.com/300x200/E0BBE4/FFFFFF?text=London', title: 'London, UK', tags: 'Flights • Hotels • Resorts' },
  { img: 'https://via.placeholder.com/300x200/F472B6/FFFFFF?text=Tokyo', title: 'Tokyo, Japan', tags: 'Flights • Hotels • Resorts' },
];

// Component thẻ con
const DestinationCard = ({ img, title, tags }) => (
  <Link to="#" className="flex items-center gap-4 p-4 bg-bg-primary rounded-lg shadow-sm hover:shadow-lg transition-shadow">
    <img src={img} alt={title} className="w-20 h-20 rounded-lg object-cover" />
    <div>
      <h4 className="font-bold text-text-primary">{title}</h4>
      <p className="text-sm text-text-secondary">{tags}</p>
    </div>
  </Link>
);

const PopularDestinations = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Header của Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-2">Plan your perfect trip</h2>
          <p className="text-text-secondary">Search Flights & Places to stay</p>
        </div>
        <Link to="/see-all" className="text-brand-primary font-medium hover:underline">
          See all places
        </Link>
      </div>
      
      {/* Lưới các địa điểm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest, index) => (
          <DestinationCard key={index} {...dest} />
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;