import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiDownload, FiShare2, FiMapPin, FiCalendar, FiClock, FiUser, FiSend } from 'react-icons/fi';
import Button from '../../components/common/Button.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import logoIcon from '../../assets/icons/Elysia.png';
import { bookingService } from '../../services/api.js';

// Component con: Terms & Contact (Tái sử dụng cho cả 2 trang vé)
const TicketFooter = () => (
  <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary">
    <h3 className="text-xl font-bold text-text-primary mb-4">Terms and Conditions</h3>
    <p className="text-sm text-text-secondary space-y-3">
      <span>Payments</span>
      <p>If you are purchasing your ticket using a debit or credit card via the Website, we will process these payments via the automated secure common payment gateway which will be subject to fraud screening purposes.</p>
      <p>If you do not supply the correct card billing address and/or cardholder information, your booking will not be confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is not received in full. Payment may be required in full or as a deposit at the time of booking.</p>
    </p>
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
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const bookingData = await bookingService.getById(id);
        setBooking(bookingData);
      } catch (err) {
        console.error('Failed to load booking', err);
        setError('Không thể tải thông tin vé. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBooking();
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

  // Extract ticket data from booking
  const ticketData = booking ? {
    id: booking.id,
    flightName: `${booking.details.airline} ${booking.details.flightNumber}`,
    from: booking.details.from,
    to: booking.details.to,
    departTime: booking.details.time ? booking.details.time.split(' — ')[0] : 'N/A',
    arriveTime: booking.details.time ? booking.details.time.split(' — ')[1] : 'N/A',
    duration: booking.details.duration || 'N/A',
    date: booking.date,
    passenger: 'Khách hàng', // Would need user info
    seat: 'Tự chọn', // Would need seat selection
    gate: 'Sẽ thông báo',
    classType: 'Economy',
    price: booking.details.price || booking.totalAmount || 0
  } : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-text-secondary text-sm">Mã đặt chỗ</p>
          <span className="text-3xl font-bold text-brand-secondary">#{ticketData.id}</span>
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

      {/* Flight Ticket */}
      <div className="bg-bg-primary rounded-2xl shadow-lg border border-border-primary p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-1">{ticketData.flightName}</h2>
        <div className="flex items-center gap-2 text-text-secondary mb-6">
          <FiMapPin className="w-4 h-4" />
          <span>Chuyến bay từ {ticketData.from} đến {ticketData.to}</span>
        </div>

        {/* Flight Information */}
        <div className="flex border border-border-primary rounded-lg overflow-hidden">
          {/* Left Section: Details */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-border-primary">
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Ngày khởi hành</p>
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-brand-primary" />
                  <span className="text-xl font-bold text-text-primary">{ticketData.date}</span>
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

            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-3xl font-bold text-text-primary">{ticketData.departTime}</p>
                <p className="text-text-secondary">{ticketData.from}</p>
              </div>
              <span className="text-sm text-text-secondary bg-brand-pale px-3 py-1 rounded-full">
                {ticketData.classType}
              </span>
            </div>

            <div className="flex items-center gap-4 my-6">
              <img src={logoIcon} alt="Elysian Realm" className="h-8 w-8 rounded-full" />
              <div className="flex-1 border-t border-dashed border-border-primary" />
              <span className="text-sm text-text-secondary">{ticketData.duration}</span>
              <div className="flex-1 border-t border-dashed border-border-primary" />
              <img src={logoIcon} alt="Elysian Realm" className="h-8 w-8 rounded-full" />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold text-text-primary">{ticketData.arriveTime}</p>
                <p className="text-text-secondary">{ticketData.to}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-border-primary">
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Hành khách</p>
                <div className="flex items-center gap-2">
                  <FiUser className="text-text-primary" />
                  <span className="font-semibold text-text-primary">{ticketData.passenger}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Cổng</p>
                <span className="font-semibold text-text-primary">{ticketData.gate}</span>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Ghế</p>
                <span className="font-semibold text-text-primary">{ticketData.seat}</span>
              </div>
            </div>
          </div>

          {/* Right Section: QR Code */}
          <div className="w-48 bg-brand-pale/30 border-l border-dashed border-border-primary flex flex-col items-center justify-center p-6 gap-4">
            <div className="text-center">
              <p className="text-xs text-text-secondary mb-2">Quét mã để check-in</p>
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

      {/* Terms and Conditions */}
      <TicketFooter />
    </div>
  );
};

export default FlightTicketPage;
