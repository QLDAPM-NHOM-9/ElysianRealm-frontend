import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend, FiCompass, FiMapPin, FiChevronRight, FiDownload, FiCalendar, FiStar } from 'react-icons/fi';
import { bookingService, reviewService } from '../../services/api.js';
import { tourService } from '../../services/tourService.js';
import Spinner from '../../components/common/Spinner.jsx';
import Button from '../../components/common/Button.jsx';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext.jsx';
import axiosClient from '../../services/axiosClient.js';

// Component vé máy bay
const FlightTicketCard = ({ data, onViewTicket, onPaymentClick }) => {
  const isPending = data.status === 'PENDING';
  const isCancelled = data.status === 'CANCELLED';

  return (
  <div className="bg-bg-primary border border-border-primary rounded-lg p-4 flex flex-col md:flex-row items-center justify-between shadow-sm gap-4">
    <div className="flex items-center gap-4 w-full md:w-auto">
      <div className="w-12 h-12 rounded-full border border-border-primary flex items-center justify-center bg-white p-2">
        <img
          src={data.details.logoUrl}
          alt="Airline"
          className="w-full h-full object-contain"
        />
      </div>
      <div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span>{data.details.from}</span>
          <FiSend className="text-brand-primary" />
          <span>{data.details.to}</span>
        </div>
        <p className="font-semibold text-text-primary mt-1">{data.details.airline}</p>
      </div>
    </div>
    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
      <div className="text-sm">
        <p className="text-text-secondary">Ngày đặt</p>
        <p className="font-semibold text-text-primary">{data.date}</p>
      </div>
      <div className="text-sm">
        <p className="text-text-secondary">Trạng thái</p>
        <p
          className={`font-semibold capitalize ${
            data.status === 'CONFIRMED' || data.status === 'COMPLETED'
              ? 'text-green-600'
              : data.status === 'CANCELLED'
              ? 'text-red-600'
              : 'text-orange-600'
          }`}
        >
          {data.status === 'PENDING' ? 'Chưa thanh toán' :
           data.status === 'CONFIRMED' ? 'Đã thanh toán' :
           data.status === 'COMPLETED' ? 'Hoàn thành' :
           data.status === 'CANCELLED' ? 'Đã hủy' : 'Đã hoàn thành'}
        </p>
      </div>
      {isCancelled ? (
        <span className="text-sm text-red-600 font-medium">Không thể xem</span>
      ) : isPending ? (
        <Button
          variant="primary"
          className="font-medium py-2 px-4 shadow-none"
          onClick={() => onPaymentClick(data)}
        >
          <span className="hidden sm:inline">Thanh toán VNPay</span>
          <span className="sm:hidden">Thanh toán</span>
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="font-medium py-2 px-4 shadow-none"
          onClick={() => onViewTicket(`/flight-ticket/${data.id}`)}
        >
          <FiDownload />
          <span className="hidden sm:inline">Vé điện tử</span>
        </Button>
      )}
    </div>
  </div>
  );
};

// Component review modal
const ReviewModal = ({ isOpen, onClose, booking, onSubmitReview }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setSubmitting(true);
    try {
      await onSubmitReview(booking, rating, reviewText);
      setRating(5);
      setReviewText('');
      onClose();
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-text-primary">Đánh giá tour</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            ✕
          </button>
        </div>

        <div className="mb-4">
          <img src={booking.details.img} alt="Tour" className="w-full h-32 object-cover rounded-lg mb-2" />
          <h4 className="font-semibold text-text-primary">{booking.details.name}</h4>
          <p className="text-sm text-text-secondary">{booking.details.location}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Đánh giá của bạn
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                >
                  <FiStar className={star <= rating ? 'fill-current' : ''} />
                </button>
              ))}
              <span className="ml-2 text-sm text-text-secondary self-center">
                {rating}/5 sao
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="reviewText" className="block text-sm font-medium text-text-primary mb-2">
              Chia sẻ trải nghiệm của bạn
            </label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Hãy chia sẻ về trải nghiệm của bạn..."
              rows={4}
              className="w-full px-3 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-border-primary rounded-lg text-text-primary hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting || !reviewText.trim()}
              className="flex-1 py-2 px-4 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Component vé tour
const TourBookingCard = ({ data, onReviewClick, hasReviewed, onViewTicket, onPaymentClick }) => {
  const canReview = (data.status === 'CONFIRMED' || data.status === 'COMPLETED') && !hasReviewed;
  const isPending = data.status === 'PENDING';
  const isCancelled = data.status === 'CANCELLED';

  return (
    <div className="bg-bg-primary border border-border-primary rounded-lg p-4 flex flex-col md:flex-row items-center justify-between shadow-sm gap-4">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <img src={data.details.img} alt="Tour" className="w-16 h-16 rounded-lg object-cover" />
        <div>
          <p className="font-semibold text-text-primary line-clamp-1">
            {data.details.name || data.details.title}
          </p>
          <div className="flex items-center gap-2 text-sm text-text-secondary mt-1">
            <FiMapPin className="w-4 h-4 text-brand-primary" />
            <span>{data.details.location}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
        <div className="text-sm">
          <p className="text-text-secondary">Khởi hành</p>
          <div className="flex items-center gap-1 font-semibold text-text-primary">
            <FiCalendar /> {data.details.startDate}
          </div>
        </div>
        <div className="text-sm">
          <p className="text-text-secondary">Trạng thái</p>
          <p
            className={`font-semibold capitalize ${
              data.status === 'CONFIRMED' || data.status === 'COMPLETED'
                ? 'text-green-600'
                : data.status === 'CANCELLED'
                ? 'text-red-600'
                : 'text-orange-600'
            }`}
          >
            {data.status === 'PENDING' ? 'Chưa thanh toán' :
             data.status === 'CONFIRMED' ? 'Đã thanh toán' :
             data.status === 'COMPLETED' ? 'Hoàn thành' :
             data.status === 'CANCELLED' ? 'Đã hủy' : 'Đã hoàn thành'}
          </p>
        </div>
        <div className="flex gap-2">
          {isCancelled ? (
            <span className="text-sm text-red-600 font-medium">Không thể xem</span>
          ) : isPending ? (
            <Button
              variant="primary"
              className="font-medium py-2 px-4 shadow-none"
              onClick={() => onPaymentClick(data)}
            >
              <span className="hidden sm:inline">Thanh toán VNPay</span>
              <span className="sm:hidden">Thanh toán</span>
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="font-medium py-2 px-4 shadow-none"
              onClick={() => onViewTicket(`/tour-ticket/${data.id}`)}
            >
              <FiDownload />
              <span className="hidden sm:inline">Xem Vé</span>
            </Button>
          )}
          {hasReviewed ? (
            <Button
              variant="outline"
              className="font-medium py-2 px-4 shadow-none cursor-default"
              disabled
            >
              <FiStar className="mr-1 text-yellow-500" />
              <span className="hidden sm:inline">Đã đánh giá</span>
            </Button>
          ) : canReview ? (
            <Button
              variant="primary"
              className="font-medium py-2 px-4 shadow-none"
              onClick={() => onReviewClick(data)}
            >
              <FiStar className="mr-1" />
              <span className="hidden sm:inline">Đánh giá</span>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const AccountHistoryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flights');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewModal, setReviewModal] = useState({ isOpen: false, booking: null });
  const [reviewedTours, setReviewedTours] = useState(new Set()); // Track reviewed tour IDs

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        // Fetch bookings and user's reviews in parallel
        const [bookingsResponse, reviewsResponse] = await Promise.allSettled([
          bookingService.getMyBookings(),
          reviewService.getReviewsByItem(0, 'TOUR').catch(() => ({ data: [] })) // Get all tour reviews, we'll filter client-side
        ]);

        const bookingsData = bookingsResponse.status === 'fulfilled'
          ? (bookingsResponse.value.data || bookingsResponse.value || [])
          : [];

        const allReviews = reviewsResponse.status === 'fulfilled'
          ? (reviewsResponse.value.data || reviewsResponse.value || [])
          : [];

        // Track which tours the current user has reviewed
        const userReviews = allReviews.filter(review =>
          review.author === (user?.name || user?.email) ||
          review.author === user?.email
        );
        const reviewedTourIds = new Set(userReviews.map(review => review.itemId));
        setReviewedTours(reviewedTourIds);

        // Enhance each booking with item details
        const enhancedBookings = await Promise.all(
          bookingsData.map(async (booking) => {
            try {
              let itemDetails = {};

              if (booking.type === 'TOUR') {
                // Fetch tour details for TOUR bookings
                const tour = await tourService.getById(booking.itemId);
                itemDetails = {
                  title: tour.title,
                  img: tour.imageUrl,
                  name: tour.title,
                  location: tour.location,
                  startDate: tour.startDate,
                  duration: tour.duration
                };
              } else if (booking.type === 'FLIGHT') {
                // Parse flight details from booking details JSON string
                try {
                  const flightDetails = JSON.parse(booking.details);
                  itemDetails = {
                    airline: flightDetails.airline || 'Unknown Airline',
                    from: flightDetails.from || 'Unknown',
                    to: flightDetails.to || 'Unknown',
                    logoUrl: flightDetails.img || '/default-flight-logo.png',
                    flightNumber: flightDetails.flightNumber || 'N/A',
                    time: flightDetails.time || ''
                  };
                } catch (parseError) {
                  console.warn('Failed to parse flight details:', parseError);
                  itemDetails = {
                    airline: 'Unknown Airline',
                    from: 'Unknown',
                    to: 'Unknown',
                    logoUrl: '/default-flight-logo.png'
                  };
                }
              }

              return {
                ...booking,
                details: itemDetails,
                // Fix: API returns uppercase TOUR/FLIGHT, convert to lowercase for filtering
                type: booking.type.toLowerCase()
              };
            } catch (itemError) {
              console.warn(`Failed to fetch details for ${booking.type} ${booking.itemId}:`, itemError);
              // Return booking without details if fetch fails
              return {
                ...booking,
                details: { title: 'Unknown', img: '/default-placeholder.png' },
                type: booking.type.toLowerCase()
              };
            }
          })
        );

        setBookings(enhancedBookings);
      } catch (err) {
        console.error('Failed to load bookings', err);
        setError('Không thể tải lịch sử đặt chỗ. Vui lòng kiểm tra kết nối.');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  // Lọc danh sách
  const filteredBookings = bookings.filter((b) =>
    activeTab === 'flights' ? b.type === 'flight' : b.type === 'tour'
  );

  // Handler for view ticket functionality
  const handleViewTicket = (path) => {
    navigate(path);
  };

  // Handler for payment functionality
  const handlePaymentClick = async (booking) => {
    try {
      // Get total price from booking or calculate from details
      const totalPrice = booking.totalPrice || 500; // Default fallback
      const amountInVND = Math.round(totalPrice * 23000);

      const response = await axiosClient.post('/payments/vnpay/create', {
        bookingId: booking.id,
        orderInfo: `Payment for booking ${booking.id}`,
        amount: amountInVND
      });

      if (response && response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('VNPay payment error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Không thể tạo liên kết thanh toán. Vui lòng thử lại.';
      toast.error(`Lỗi thanh toán: ${errorMessage}`);
    }
  };

  // Handlers for review functionality
  const handleReviewClick = (booking) => {
    setReviewModal({ isOpen: true, booking });
  };

  const handleCloseReviewModal = () => {
    setReviewModal({ isOpen: false, booking: null });
  };

  const handleSubmitReview = async (booking, rating, reviewText) => {
    try {
      const reviewData = {
        type: 'TOUR',
        itemId: booking.itemId,
        rating: rating,
        text: reviewText.trim(),
        author: user?.name || user?.email || 'Anonymous', // Use actual user name/email
        avatar: user?.avatar || null
      };

      await reviewService.create(reviewData);

      // Update the reviewed tours state to prevent duplicate reviews
      setReviewedTours(prev => new Set([...prev, booking.itemId]));

      toast.success('Đánh giá của bạn đã được gửi thành công!');

      // Optionally refresh the page or update local state
      // For now, just close the modal
    } catch (error) {
      console.error('Failed to submit review:', error);
      toast.error('Không thể gửi đánh giá. Vui lòng thử lại.');
      throw error; // Re-throw to let modal handle the error
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-6">Lịch sử Đặt chỗ</h3>

      <div className="flex items-center border-b border-border-primary mb-6">
        <button
          onClick={() => setActiveTab('flights')}
          className={`flex items-center gap-2 py-3 px-4 font-medium border-b-2 transition-colors ${
            activeTab === 'flights'
              ? 'border-brand-primary text-brand-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          <FiSend />
          <span>Chuyến bay</span>
        </button>
        <button
          onClick={() => setActiveTab('tours')}
          className={`flex items-center gap-2 py-3 px-4 font-medium border-b-2 transition-colors ${
            activeTab === 'tours'
              ? 'border-brand-primary text-brand-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          <FiCompass />
          <span>Tours</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) =>
              activeTab === 'flights' ? (
                <FlightTicketCard key={booking.id} data={booking} onViewTicket={handleViewTicket} onPaymentClick={handlePaymentClick} />
              ) : (
                <TourBookingCard
                  key={booking.id}
                  data={booking}
                  onReviewClick={handleReviewClick}
                  hasReviewed={reviewedTours.has(booking.itemId)}
                  onViewTicket={handleViewTicket}
                  onPaymentClick={handlePaymentClick}
                />
              )
            )
          ) : (
            <div className="text-center py-12 text-text-secondary bg-gray-50 rounded-lg border border-dashed border-border-primary">
              <p>
                Bạn chưa đặt{' '}
                {activeTab === 'flights' ? 'chuyến bay' : 'tour'} nào.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModal.isOpen}
        onClose={handleCloseReviewModal}
        booking={reviewModal.booking}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
};

export default AccountHistoryPage;
