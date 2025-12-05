import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { homeApi } from '../../services/api.js';
import Spinner from '../common/Spinner.jsx';

// Component thẻ con
const ReviewCard = ({ title, text, rating, user, location, img }) => (
  <div className="bg-bg-primary rounded-lg shadow-sm h-full flex flex-col">
    <div className="p-6 flex-1">
      <h4 className="text-xl font-bold text-text-primary mb-3">{title}</h4>
      <p className="text-text-secondary mb-4 line-clamp-3">{text}</p>
      
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} className={`fill-current ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <img src="https://via.placeholder.com/40" alt={user} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <h5 className="font-semibold text-text-primary">{user}</h5>
          <p className="text-sm text-text-secondary">{location}</p>
        </div>
      </div>
    </div>
    <img src={img} alt="Review image" className="w-full h-56 object-cover rounded-b-lg" />
  </div>
);

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await homeApi.getReviews();
        setReviews(data);
      } catch (error) {
        console.error("Failed to load reviews", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-text-primary">Reviews</h2>
        <Link to="#" className="text-brand-primary font-medium hover:underline">
          See all
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Reviews;