import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { homeApi } from '../../services/api.js';
import Spinner from '../common/Spinner.jsx';

// Component thẻ con
const ReviewCard = ({ author, text, rating, avatar }) => (
  <div className="bg-bg-primary rounded-lg shadow-sm h-full flex flex-col">
    <div className="p-6 flex-1">
      <h4 className="text-xl font-bold text-text-primary mb-3">Đánh giá từ {author}</h4>
      <p className="text-text-secondary mb-4 line-clamp-3">{text}</p>

      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} className={`fill-current ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
        <span className="ml-2 text-sm text-text-secondary">({rating}/5)</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <img
          src={avatar
            ? avatar
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random&size=40`
          }
          alt={author}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h5 className="font-semibold text-text-primary">{author}</h5>
          <p className="text-sm text-text-secondary">Khách hàng</p>
        </div>
      </div>
    </div>
    <img
      src={`https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`}
      alt="Review image"
      className="w-full h-56 object-cover rounded-b-lg"
    />
  </div>
);

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback reviews in case API returns empty data
  const fallbackReviews = [
    {
      id: 1,
      title: "Trải nghiệm tuyệt vời tại Hà Nội",
      text: "Chuyến đi đến Hà Nội thật tuyệt vời! Chúng tôi đã khám phá được nhiều điểm lịch sử và thưởng thức những món ăn đặc trưng của vùng. Hướng dẫn viên rất chuyên nghiệp và thân thiện.",
      rating: 5,
      user: "Nguyễn Văn A",
      location: "Hà Nội",
      img: "https://picsum.photos/600/400?random=600"
    },
    {
      id: 2,
      title: "Du lịch biển Đà Nẵng đáng nhớ",
      text: "Đà Nẵng có bãi biển tuyệt đẹp và các điểm du lịch rất thú vị. Dịch vụ tốt, giá cả hợp lý. Chúng tôi sẽ quay lại lần sau và giới thiệu cho bạn bè.",
      rating: 5,
      user: "Trần Thị B",
      location: "Đà Nẵng",
      img: "https://picsum.photos/600/400?random=601"
    },
    {
      id: 3,
      title: "Khám phá Sapa - vùng núi hùng vĩ",
      text: "Sapa mang đến những trải nghiệm tuyệt vời với ruộng bậc thang và văn hóa dân tộc. Không khí mát lạnh và cảnh quan tuyệt đẹp. Rất đáng để trải nghiệm!",
      rating: 4,
      user: "Lê Văn C",
      location: "Sapa",
      img: "https://picsum.photos/600/400?random=602"
    }
  ];

  // Gọi API khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await homeApi.getReviews();
        // Use fallback data if API returns empty array
        setReviews(data && data.length > 0 ? data : fallbackReviews);
      } catch (error) {
        console.error("Failed to load reviews", error);
        // Use fallback data on error
        setReviews(fallbackReviews);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-text-primary">Đánh giá từ khách hàng</h2>
        <Link to="#" className="text-brand-primary font-medium hover:underline">
          Xem tất cả
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
