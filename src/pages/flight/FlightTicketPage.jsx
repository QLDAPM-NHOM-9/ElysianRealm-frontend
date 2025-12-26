import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { FiDownload, FiShare2, FiMapPin, FiCalendar, FiClock, FiUser, FiSend } from 'react-icons/fi';
import Button from '../../components/common/Button.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import logoIcon from '../../assets/icons/Elysia.png';
import { bookingService } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';

// Component con: Terms & Contact (Tái sử dụng cho cả 2 trang vé)
const TicketFooter = () => (
  <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary">
    <h3 className="text-xl font-bold text-text-primary mb-4">Terms and Conditions</h3>
    <div className="text-sm text-text-secondary space-y-3">
      <div>
        <span className="font-medium">Payments</span>
        <p className="mt-2">If you are purchasing your ticket using a debit or credit card via the Website, we will process these payments via the automated secure common payment gateway which will be subject to fraud screening purposes.</p>
        <p className="mt-2">If you do not supply the correct card billing address and/or cardholder information, your booking will not be confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is not received in full. Payment may be required in full or as a deposit at the time of booking.</p>
      </div>
    </div>
    <h3 className="text-xl font-bold text-text-primary mt-6 mb-4">Contact Us</h3>
    <p className="text-sm text-text-secondary">
      If you have any questions about our Website or our Terms of Use, please contact:
      <br />
      Elysian Realm Group Q.F.C.
      <br />
      Doha, State of Qatar
    </p>
  </div>
);

const FlightTicketPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = location.state?.isAdmin || false;
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const bookingResponse = await (isAdmin ? bookingService.getByIdAdmin(id) : bookingService.getById(id));
        const bookingData = bookingResponse?.data || bookingResponse;

        if (!bookingData || Object.keys(bookingData).length === 0) {
          setError('Dữ liệu vé không hợp lệ.');
          setLoading(false);
          return;
        }

        // Parse the details JSON string if it's a flight booking
        if (bookingData.type === 'FLIGHT' && typeof bookingData.details === 'string') {
          try {
            bookingData.details = JSON.parse(bookingData.details);
          } catch (parseError) {
            console.warn('Failed to parse flight details:', parseError);
          }
        }

        // If we have a flightId, fetch additional flight details
        if (bookingData.flightId) {
          try {
            const flightService = (await import('../../services/flightService.js')).default;
            const flightDetails = await flightService.getById(bookingData.flightId);
            bookingData.flightDetails = flightDetails?.data || flightDetails;
          } catch (flightError) {
            console.warn('Failed to fetch flight details:', flightError);
            // Don't fail the whole page if flight details fail
          }
        }

        setBooking(bookingData);
      } catch (err) {
        console.error('Failed to load booking', err);
        const errorMessage = err?.response?.data?.message || err?.message || 'Không thể tải thông tin vé. Vui lòng thử lại sau.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id, isAdmin]);

  const handleDownload = () => {
    // PDF download functionality can be added later using libraries like jsPDF
    window.print();
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Flight Ticket',
        text: `My flight booking #${booking?.id}`,
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
          <Link to="/flight-listing" className="text-brand-primary hover:underline mt-4 inline-block">
            Quay lại danh sách chuyến bay
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to format time
  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch {
      return dateTimeString;
    }
  };

  // Helper function to calculate duration from time string
  const calculateDurationFromTimes = (timeString) => {
    if (!timeString || !timeString.includes(' — ')) return null;

    try {
      const [departTime, arriveTime] = timeString.split(' — ');
      const depart = new Date(departTime);
      const arrive = new Date(arriveTime);

      const diffMs = arrive.getTime() - depart.getTime();
      const diffMinutes = Math.floor(diffMs / (1000 * 60));

      return diffMinutes;
    } catch (error) {
      console.warn('Failed to calculate duration from times:', error);
      return null;
    }
  };

  // Helper function to format duration
  const formatDuration = (minutes) => {
    if (!minutes || minutes === 'N/A' || minutes <= 0) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Extract ticket data from booking
  const ticketData = booking ? {
    id: booking.id,
    flightName: `${booking.details.airline} ${booking.details.flightNumber}`,
    from: booking.details.from,
    to: booking.details.to,
    departTime: booking.flightDetails ? formatTime(booking.flightDetails.departureTime) : formatTime(booking.details.time?.split(' — ')[0]),
    arriveTime: booking.flightDetails ? formatTime(booking.flightDetails.arrivalTime) : formatTime(booking.details.time?.split(' — ')[1]),
    duration: booking.flightDetails
      ? formatDuration(booking.flightDetails.duration)
      : booking.details.duration
        ? formatDuration(booking.details.duration)
        : formatDuration(calculateDurationFromTimes(booking.details.time)),
    date: booking.date,
    passenger: `Khách hàng (${booking.guests || 1})`,
    seat: 'Tự chọn',
    gate: 'Sẽ thông báo',
    classType: 'Economy',
    price: booking.totalPrice || 0
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-border-primary p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                  <FiSend className="text-white w-5 h-5" />
                </div>
                <div>
                  <p className="text-text-secondary text-sm">Mã đặt chỗ</p>
                  <span className="text-2xl font-bold text-brand-secondary">#{ticketData.id}</span>
                </div>
              </div>
              <p className="text-text-secondary">
                Chuyến bay từ <span className="font-semibold text-text-primary">{ticketData.from}</span> đến{' '}
                <span className="font-semibold text-text-primary">{ticketData.to}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="px-4 py-2 rounded-lg border-2 hover:bg-gray-50"
                onClick={handleShare}
              >
                <FiShare2 className="w-4 h-4 mr-2" />
                Chia sẻ
              </Button>
            </div>
          </div>
        </div>

        {/* Flight Ticket */}
        <div className="bg-white rounded-2xl shadow-lg border border-border-primary overflow-hidden mb-8">
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">{ticketData.flightName}</h1>
                <p className="text-blue-100 flex items-center gap-2">
                  <FiMapPin className="w-4 h-4" />
                  {ticketData.from} → {ticketData.to}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-100">Hạng ghế</p>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {ticketData.classType}
                </span>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="p-8">
            {/* Date and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <FiCalendar className="w-8 h-8 text-brand-primary mx-auto mb-2" />
                <p className="text-xs text-text-secondary uppercase font-medium mb-1">Ngày khởi hành</p>
                <p className="text-lg font-bold text-text-primary">{ticketData.date}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <FiClock className="w-8 h-8 text-brand-primary mx-auto mb-2" />
                <p className="text-xs text-text-secondary uppercase font-medium mb-1">Thời lượng</p>
                <p className="text-lg font-bold text-text-primary">{ticketData.duration}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <FiUser className="w-8 h-8 text-brand-primary mx-auto mb-2" />
                <p className="text-xs text-text-secondary uppercase font-medium mb-1">Hành khách</p>
                <p className="text-lg font-bold text-text-primary">{ticketData.passenger}</p>
              </div>
            </div>

            {/* Flight Route */}
            <div className="relative mb-8">
              <div className="flex items-center justify-between">
                {/* Departure */}
                <div className="text-center flex-1">
                  <div className="bg-brand-primary text-white rounded-lg p-4 mb-2">
                    <p className="text-3xl font-bold mb-1">{ticketData.departTime}</p>
                    <p className="text-sm text-blue-100">{ticketData.from}</p>
                  </div>
                  <p className="text-xs text-text-secondary uppercase">Khởi hành</p>
                </div>

                {/* Flight Path */}
                <div className="flex-1 flex items-center px-4">
                  <div className="flex-1 border-t-2 border-dashed border-brand-primary relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-white border-2 border-brand-primary rounded-full p-2">
                        <FiSend className="w-4 h-4 text-brand-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-brand-pale rounded-full">
                    <span className="text-sm font-medium text-brand-primary">{ticketData.duration}</span>
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-brand-primary"></div>
                </div>

                {/* Arrival */}
                <div className="text-center flex-1">
                  <div className="bg-green-600 text-white rounded-lg p-4 mb-2">
                    <p className="text-3xl font-bold mb-1">{ticketData.arriveTime}</p>
                    <p className="text-sm text-green-100">{ticketData.to}</p>
                  </div>
                  <p className="text-xs text-text-secondary uppercase">Đến nơi</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <p className="text-xs text-text-secondary uppercase mb-1">Cổng</p>
                <span className="bg-gray-100 px-3 py-1 rounded text-sm font-medium">{ticketData.gate}</span>
              </div>
              <div className="text-center">
                <p className="text-xs text-text-secondary uppercase mb-1">Ghế</p>
                <span className="bg-gray-100 px-3 py-1 rounded text-sm font-medium">{ticketData.seat}</span>
              </div>
              <div className="text-center">
                <p className="text-xs text-text-secondary uppercase mb-1">Giá vé</p>
                <span className="bg-gray-100 px-3 py-1 rounded text-sm font-medium">${ticketData.price}</span>
              </div>
              <div className="text-center">
                <p className="text-xs text-text-secondary uppercase mb-1">Trạng thái</p>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium">Đã xác nhận</span>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-gray-50 border-t border-border-primary p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-lg font-bold text-text-primary mb-2">Check-in tại sân bay</h3>
                <p className="text-text-secondary mb-4">
                  Quét mã QR này tại quầy check-in hoặc kiosk tự động để nhận thẻ lên máy bay
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    <span>Trước 2 tiếng bay</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    <span>Sân bay khởi hành</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-dashed border-brand-primary rounded-xl p-6 flex flex-col items-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${ticketData.id}`}
                  alt="QR Code"
                  className="w-24 h-24 mb-3"
                />
                <p className="text-xs text-text-secondary mb-1">Mã đặt chỗ</p>
                <p className="font-bold text-text-primary">#{ticketData.id}</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default FlightTicketPage;
