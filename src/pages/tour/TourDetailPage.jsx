import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiChevronRight, FiHeart, FiShare2, FiStar, FiMapPin, FiClock, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import Button from '../../components/common/Button.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import tourService from '../../services/tourService.js';
import flightService from '../../services/flightService.js';

// Component con: Mục lịch trình
const ItineraryItem = ({ day, description }) => (
  <div className="flex gap-4 mb-6 relative">
    {/* Đường kẻ nối */}
    <div className="absolute left-[19px] top-8 bottom-[-24px] w-0.5 bg-border-primary last:hidden"></div>
    
    <div className="w-10 h-10 flex-shrink-0 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold z-10">
      {day}
    </div>
    <div className="bg-bg-primary p-4 rounded-lg shadow-sm border border-border-primary flex-1">
      <h4 className="font-bold text-text-primary mb-2">Ngày {day}</h4>
      <p className="text-text-secondary">{description}</p>
    </div>
  </div>
);

// Component con: Thẻ review (Tái sử dụng)
const ReviewCard = ({ user, text, rating }) => (
  <div className="border-b border-border-primary py-4">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-3">
        <img src={`https://ui-avatars.com/api/?name=${user}&background=random`} alt={user} className="w-10 h-10 rounded-full" />
        <div>
          <h5 className="font-semibold text-text-primary">{user}</h5>
          <p className="text-sm text-text-secondary">15/10/2025</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-sm font-medium bg-brand-primary text-white py-1 px-2 rounded">
        {rating} <FiStar className="w-3 h-3 fill-current" />
      </div>
    </div>
    <p className="text-text-secondary">{text}</p>
  </div>
);

const TourDetailPage = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true);
      try {
        const data = await tourService.getById(id);
        setTour(data);
        
        // Tour LUÔN có flight, fetch flight details
        if (data.flightId) {
          try {
            const flightData = await flightService.getById(data.flightId);
            setFlight(flightData);
          } catch (err) {
            console.warn("Failed to fetch flight:", err);
          }
        }
      } catch (error) {
        console.error("Failed to fetch tour:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (loading) return <div className="h-screen flex justify-center items-center"><Spinner size="lg" /></div>;
  if (!tour) return <div className="h-screen flex justify-center items-center text-xl">Tour không tìm thấy!</div>;

  // Xử lý ảnh gallery (nếu không có thì dùng ảnh bìa lặp lại)
  const gallery = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.imageUrl, tour.imageUrl, tour.imageUrl];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-text-secondary mb-4">
        <Link to="/" className="hover:underline">Trang chủ</Link>
        <FiChevronRight className="mx-1" />
        <Link to="/tour-listing" className="hover:underline">Tours</Link>
        <FiChevronRight className="mx-1" />
        <span className="text-text-primary font-medium">Chi tiết</span>
      </nav>

      {/* Header trang */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">{tour.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-text-secondary mt-2">
            <div className="flex items-center gap-1">
              <FiMapPin className="text-brand-primary" />
              <span>{tour.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock className="text-brand-primary" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiCalendar className="text-brand-primary" />
              <span>Khởi hành: {tour.startDate}</span>
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-text-secondary">giá từ</p>
          <p className="text-3xl font-bold text-brand-secondary">${tour.price}<span className="text-lg font-normal text-text-secondary">/khách</span></p>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" isIconOnly={true} className="w-12 h-12 rounded-lg"><FiHeart /></Button>
            <Button variant="outline" isIconOnly={true} className="w-12 h-12 rounded-lg"><FiShare2 /></Button>
            <Link to="/tour-booking" state={{ tour }}> {/* Truyền data tour sang trang booking */}
              <Button variant="primary" className="px-6 h-12 rounded-lg">Đặt ngay</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Ảnh */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[450px] rounded-2xl overflow-hidden shadow-lg mb-8">
        <div className="col-span-2 row-span-2">
          <img src={tour.imageUrl} alt="Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
        {/* Hiển thị các ảnh từ gallery */}
        <div className="col-span-1 row-span-1"><img src={gallery[0]} alt="Sub 1" className="w-full h-full object-cover" /></div>
        <div className="col-span-1 row-span-1"><img src={gallery[1]} alt="Sub 2" className="w-full h-full object-cover" /></div>
        <div className="col-span-1 row-span-1"><img src={gallery[2] || gallery[0]} alt="Sub 3" className="w-full h-full object-cover" /></div>
        <div className="col-span-1 row-span-1 relative">
           <img src={gallery[3] || gallery[1]} alt="Sub 4" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-black/50 transition-colors">
             Xem tất cả ảnh
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Cột trái: Nội dung chi tiết */}
        <div className="lg:col-span-2">
          
          {/* Flight Info (LUÔN bao gồm - tùy chọn mua) */}
          {flight && (
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <IoPaperPlaneOutline className="text-blue-600 text-xl" />
                <h3 className="text-xl font-bold text-blue-900">Vé máy bay (kèm theo tour)</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-600">Hãng</p>
                  <p className="font-semibold text-text-primary">{flight.airline}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tuyến đường</p>
                  <p className="font-semibold text-text-primary">{flight.from} → {flight.to}</p>
                </div>
                <div>
                  <p className="text-gray-600">Thời gian</p>
                  <p className="font-semibold text-text-primary">{flight.departureTime} - {flight.arrivalTime}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">💡 Bạn có thể chọn kèm vé máy bay khi đặt tour</p>
            </div>
          )}
          
          {/* Tổng quan */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Tổng quan</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              {tour.description}
            </p>
            <div className="p-4 bg-brand-pale rounded-lg flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-brand-primary">{tour.rating}</span>
                <div className="text-sm">
                  <p className="font-bold text-text-primary">Tuyệt vời</p>
                  <p className="text-text-secondary">{tour.reviewCount} đánh giá</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lịch trình (Itinerary) - Phần quan trọng của Tour */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Lịch trình chi tiết</h3>
            <div className="pl-2">
              {tour.itinerary && tour.itinerary.map((item, index) => (
                <ItineraryItem key={index} day={index + 1} description={item} />
              ))}
            </div>
          </div>

          {/* Bao gồm / Không bao gồm */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Dịch vụ bao gồm</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-text-secondary"><FiCheckCircle className="text-green-500"/> Xe đưa đón đời mới</div>
              <div className="flex items-center gap-2 text-text-secondary"><FiCheckCircle className="text-green-500"/> Khách sạn 4-5 sao</div>
              <div className="flex items-center gap-2 text-text-secondary"><FiCheckCircle className="text-green-500"/> Hướng dẫn viên nhiệt tình</div>
              <div className="flex items-center gap-2 text-text-secondary"><FiCheckCircle className="text-green-500"/> Vé tham quan các điểm</div>
              <div className="flex items-center gap-2 text-text-secondary"><FiCheckCircle className="text-green-500"/> Nước suối, khăn lạnh</div>
              <div className="flex items-center gap-2 text-text-secondary"><FiCheckCircle className="text-green-500"/> Bảo hiểm du lịch</div>
            </div>
          </div>

        </div>
        
        {/* Cột phải: Bản đồ hoặc Thông tin khác */}
        <div className="space-y-6">
           <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center text-text-secondary border border-dashed border-border-primary">
             Bản đồ Tour (Placeholder)
           </div>
           
           {/* Box hỗ trợ */}
           <div className="bg-brand-pale p-6 rounded-xl border border-brand-primary/20">
             <h4 className="font-bold text-text-primary mb-2">Cần hỗ trợ?</h4>
             <p className="text-sm text-text-secondary mb-4">Liên hệ với chúng tôi để được tư vấn miễn phí về tour này.</p>
             <p className="font-bold text-brand-primary text-lg">1900 123 456</p>
           </div>
        </div>
      </div>

      {/* Phần Reviews */}
      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-4">Đánh giá từ khách hàng</h3>
        <div className="space-y-4">
          <ReviewCard user="Minh Anh" rating={5.0} text="Chuyến đi rất tuyệt vời, hướng dẫn viên nhiệt tình. Đồ ăn ngon, khách sạn sạch sẽ." />
          <ReviewCard user="Thanh Tùng" rating={4.5} text="Cảnh đẹp, lịch trình hợp lý không quá mệt. Sẽ ủng hộ lần sau." />
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;