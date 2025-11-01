import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi'; // Icon ngôi sao

// Dữ liệu mẫu
const reviews = [
  {
    title: '"A real sense of community, nurtured"',
    text: 'Really appreciate the help and support from the staff during my stay. Will be back by the end of the month!',
    rating: 5,
    user: 'Olga',
    location: 'Weave Studios – Kai Tak',
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbFEeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    title: '"The facilities are superb. Clean, new..."',
    text: 'Really appreciate the help and support from the staff during my stay. Will be back by the end of the month!',
    rating: 5,
    user: 'Thomas',
    location: 'Weave Studios – Kai Tak',
    img: 'https://images.unsplash.com/photo-1537726235470-8504e3b7711c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80',
  },
  {
    title: '"A real sense of community, nurtured"',
    text: 'Really appreciate the help and support from the staff during my stay. Will be back by the end of the month!',
    rating: 5,
    user: 'Eliot',
    location: 'Weave Studios – Kai Tak',
    img: 'https://images.unsplash.com/photo-1440778303588-435521a205bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

// Component thẻ con
const ReviewCard = ({ title, text, rating, user, location, img }) => (
  <div className="bg-bg-primary rounded-lg shadow-sm">
    <div className="p-6">
      <h4 className="text-xl font-bold text-text-primary mb-3">{title}</h4>
      <p className="text-text-secondary mb-4">{text}</p>
      
      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <FiStar key={i} className="text-yellow-400 fill-current" />
        ))}
        <Link to="#" className="text-sm text-text-secondary ml-auto hover:underline">
          View more
        </Link>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <img src="https://via.placeholder.com/40" alt={user} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <h5 className="font-semibold text-text-primary">{user}</h5>
          <p className="text-sm text-text-secondary">{location}</p>
        </div>
      </div>
    </div>
    {/* Ảnh review */}
    <img src={img} alt="Review image" className="w-full h-56 object-cover rounded-b-lg" />
  </div>
);

const Reviews = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Header của Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-text-primary">Reviews</h2>
        <Link to="/all-reviews" className="text-brand-primary font-medium hover:underline">
          See all
        </Link>
      </div>

      {/* Lưới các đánh giá */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
};

export default Reviews;