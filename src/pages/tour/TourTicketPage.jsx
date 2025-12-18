import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiDownload, FiShare2, FiMapPin, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Button from '../../components/common/Button.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import logoIcon from '../../assets/icons/Elysia.png';
import { bookingService } from '../../services/api.js';
import tourService from '../../services/tourService.js';

const TicketFooter = () => (
  <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary mt-8">
    <h3 className="text-xl font-bold text-text-primary mb-4">Điều khoản & Điều kiện</h3>
    <p className="text-sm text-text-secondary space-y-3">
      Vui lòng mang theo vé này (bản in hoặc điện tử) đến điểm tập trung đúng giờ.
      Tour không hoàn hủy trong vòng 24h trước giờ khởi hành.
    </p>
    <h3 className="text-xl font-bold text-text-primary mt-6 mb-4">Liên hệ</h3>
    <p className="text-sm text-text-secondary">
      Hotline: 1900 123 456 <br/> Email: support@elysianrealm.com
    </p>
  </div>
);

const TourTicketPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingAndTour = async () => {
      try {
        setLoading(true);

        // Fetch booking data
        const bookingData = await bookingService.getById(id);
        console.log('Booking data:', bookingData); // Debug log
        setBooking(bookingData);

        // If booking has itemId (tour ID), fetch tour details
        if (bookingData.itemId) {
          try {
            console.log('Fetching tour with ID:', bookingData.itemId); // Debug log
            const tourData = await tourService.getById(bookingData.itemId);
            console.log('Tour data:', tourData); // Debug log
            setTour(tourData);
          } catch (tourErr) {
            console.warn('Failed to fetch tour details:', tourErr);
            // Continue without tour details
          }
        } else {
          console.warn('No itemId found in booking data:', bookingData); // Debug log
          // Try alternative field names that might be used
          const tourId = bookingData.tourId || bookingData.itemId || bookingData.serviceId;
          if (tourId) {
            console.log('Found alternative tour ID field:', tourId);
            try {
              const tourData = await tourService.getById(tourId);
              console.log('Tour data (alternative):', tourData);
              setTour(tourData);
            } catch (tourErr) {
              console.warn('Failed to fetch tour with alternative ID:', tourErr);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load booking', err);
        setError('Không thể tải thông tin vé. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookingAndTour();
    }
  }, [id]);

  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    console.log('Downloading ticket...');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Tour Ticket',
        text: `My tour booking #${booking?.id}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <Link to="/tour-listing" className="text-brand-primary hover:underline mt-4 inline-block">
            Quay lại danh sách tour
          </Link>
        </div>
      </div>
    );
  }

  // Combine booking and tour data
  const ticketData = booking ? {
    id: booking.id || id,
    bookingNumber: booking.bookingNumber,
    tourName: tour?.title || 'Tour du lịch',
    location: tour?.location || 'Địa điểm chưa xác định',
    duration: tour?.duration || 'Thời lượng chưa xác định',
    startDate: booking.date ? new Date(booking.date).toLocaleDateString('vi-VN') : tour?.startDate || 'Ngày chưa xác định',
    meetingPoint: tour?.meetingPoint || 'Điểm tập trung chưa xác định',
    guests: `${booking.guests || 1} khách`,
    passenger: booking.passenger || 'Khách hàng',
    totalPrice: booking.totalPrice || tour?.price || 0,
    paymentMethod: booking.paymentMethod,
    status: booking.status
  } : {
    // Fallback data if no booking found
    id: id || 'TR-789012',
    tourName: 'Hành trình di sản miền Trung',
    location: 'Da Nang, Vietnam',
    duration: '4 Ngày 3 Đêm',
    startDate: '10/12/2025',
    meetingPoint: 'Sân bay Đà Nẵng',
    guests: '2 Người lớn',
    passenger: 'Nguyễn Văn A',
    totalPrice: 6650000
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <p className="text-text-secondary text-sm">Mã đặt chỗ</p>
          <span className="text-3xl font-bold text-brand-secondary">#{ticketData.bookingNumber || ticketData.id}</span>
          {ticketData.status && (
            <div className="mt-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                ticketData.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                ticketData.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {ticketData.status === 'CONFIRMED' ? 'Đã thanh toán' :
                 ticketData.status === 'COMPLETED' ? 'Hoàn thành' :
                 ticketData.status === 'PENDING' ? 'Đang xử lý' : ticketData.status}
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            isIconOnly={true}
            className="w-12 h-12 rounded-lg"
            onClick={handleShare}
          >
            <FiShare2 />
          </Button>
          <Button
            variant="primary"
            className="px-6 h-12 rounded-lg flex items-center gap-2"
            onClick={handleDownload}
          >
            <FiDownload /> Tải vé
          </Button>
        </div>
      </div>

      {/* Tour Ticket */}
      <div className="bg-bg-primary rounded-2xl shadow-lg border border-border-primary p-8">
        <h2 className="text-2xl font-bold text-text-primary mb-1">{ticketData.tourName}</h2>
        <div className="flex items-center gap-2 text-text-secondary mb-6">
          <FiMapPin className="w-4 h-4" />
          <span>{ticketData.location}</span>
        </div>

        {/* Thông tin chi tiết */}
        <div className="flex flex-col md:flex-row border border-border-primary rounded-lg overflow-hidden">
          {/* Phần trái: Chi tiết */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-border-primary">
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Ngày khởi hành</p>
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-brand-primary" />
                  <span className="text-xl font-bold text-text-primary">{ticketData.startDate}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Thời lượng</p>
                <div className="flex items-center gap-2">
                  <FiClock className="text-brand-primary" />
                  <span className="text-xl font-bold text-text-primary">{ticketData.duration}</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-text-secondary uppercase mb-1">Khách hàng</p>
              <div className="flex items-center gap-2">
                <FiUser className="text-text-primary" />
                <span className="font-semibold text-text-primary">{ticketData.passenger}</span>
              </div>
              <p className="text-sm text-text-secondary pl-6">{ticketData.guests}</p>
            </div>
          </div>

          {/* Phần phải: QR Code */}
          <div className="w-full md:w-48 bg-brand-pale/30 border-t md:border-t-0 md:border-l border-dashed border-border-primary flex flex-col items-center justify-center p-6 gap-4">
            <img src={logoIcon} alt="Elysian Realm" className="h-12 w-12 rounded-full" />
            <div className="text-center">
              <p className="text-xs text-text-secondary">Quét mã để check-in</p>
            </div>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${ticketData.id}`}
              alt="QR Code"
              className="w-24 h-24 mix-blend-multiply"
            />
            <div className="text-center">
              <p className="text-xs text-text-secondary">ID: {ticketData.id}</p>
            </div>
          </div>
        </div>
      </div>

      <TicketFooter />
    </div>
  );
};

export default TourTicketPage;
