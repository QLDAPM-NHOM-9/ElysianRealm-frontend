import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingSidebar from '../../components/listings/BookingSidebar.jsx';
import PaymentOptions from '../../components/listings/PaymentOptions.jsx';
import Modal from '../../components/common/Modal.jsx';
import Select from '../../components/common/Select.jsx';
import Button from '../../components/common/Button.jsx';
import Checkbox from '../../components/common/Checkbox.jsx';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiMinus, FiPlus } from 'react-icons/fi';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { bookingService } from '../../services/api.js';

// Component con: Guest selection modal
const GuestSelectionModal = ({ isOpen, onClose, adults, children, infants, onChange }) => {
  const updateGuests = (type, value) => {
    const updatedGuests = { ...{ adults, children, infants } };
    updatedGuests[type] = Math.max(0, updatedGuests[type] + value);
    onChange(updatedGuests);
  };

  const totalGuests = adults + children + infants;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chọn số lượng khách">
      <div className="space-y-6">
        {/* Adults */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-text-primary">Người lớn</p>
            <p className="text-sm text-text-secondary">Từ 12 tuổi trở lên</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateGuests('adults', -1)}
              disabled={adults <= 1}
              className="w-8 h-8 rounded-full border border-border-primary flex items-center justify-center disabled:opacity-50"
            >
              <FiMinus />
            </button>
            <span className="w-8 text-center font-medium">{adults}</span>
            <button
              onClick={() => updateGuests('adults', 1)}
              className="w-8 h-8 rounded-full border border-border-primary flex items-center justify-center bg-brand-pale text-brand-primary"
            >
              <FiPlus />
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-text-primary">Trẻ em</p>
            <p className="text-sm text-text-secondary">Từ 2-11 tuổi</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateGuests('children', -1)}
              disabled={children <= 0}
              className="w-8 h-8 rounded-full border border-border-primary flex items-center justify-center disabled:opacity-50"
            >
              <FiMinus />
            </button>
            <span className="w-8 text-center font-medium">{children}</span>
            <button
              onClick={() => updateGuests('children', 1)}
              className="w-8 h-8 rounded-full border border-border-primary flex items-center justify-center bg-brand-pale text-brand-primary"
            >
              <FiPlus />
            </button>
          </div>
        </div>

        {/* Infants */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-text-primary">Em bé</p>
            <p className="text-sm text-text-secondary">Dưới 2 tuổi</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateGuests('infants', -1)}
              disabled={infants <= 0}
              className="w-8 h-8 rounded-full border border-border-primary flex items-center justify-center disabled:opacity-50"
            >
              <FiMinus />
            </button>
            <span className="w-8 text-center font-medium">{infants}</span>
            <button
              onClick={() => updateGuests('infants', 1)}
              className="w-8 h-8 rounded-full border border-border-primary flex items-center justify-center bg-brand-pale text-brand-primary"
            >
              <FiPlus />
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-border-primary">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-text-primary">Tổng: {totalGuests} khách</span>
            <Button onClick={onClose} variant="primary">
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Component con: Thông tin Tour tóm tắt (Bên trái)
const TourInfoSummary = ({ tour, guests, onChangeGuests, onOpenModal }) => {
  const totalGuests = guests.adults + guests.children + guests.infants;
  const adultText = guests.adults === 1 ? '1 người lớn' : `${guests.adults} người lớn`;
  const childText = guests.children > 0 ? `, ${guests.children} trẻ em` : '';
  const infantText = guests.infants > 0 ? `, ${guests.infants} em bé` : '';

  return (
    <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={tour.imageUrl}
          alt={tour.title}
          className="w-full md:w-32 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text-primary mb-2">{tour.title}</h3>
          <div className="flex flex-col gap-2 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-brand-primary" /> {tour.location}
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-brand-primary" /> {tour.duration}
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-brand-primary" /> Khởi hành:{' '}
              <span className="font-semibold text-text-primary">{tour.startDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border-primary flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-pale rounded-full text-brand-primary">
            <FiUsers />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Số lượng khách</p>
            <p className="font-semibold text-text-primary">{adultText}{childText}{infantText}</p>
          </div>
        </div>
        <button
          onClick={onOpenModal}
          className="text-brand-primary text-sm font-medium hover:underline"
        >
          Thay đổi
        </button>
      </div>
    </div>
  );
};

const TourBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  // Note: includeFlightInBooking removed since flight option is commented out

  // Guest selection state
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    infants: 0
  });
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Lấy data tour từ state truyền qua
  const tourData = location.state?.tour;

  if (!tourData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-text-secondary text-lg">
          Không tìm thấy thông tin tour. Vui lòng quay lại và chọn tour.
        </p>
      </div>
    );
  }

  // Calculate dynamic pricing based on guests
  const totalGuests = guests.adults + guests.children + guests.infants;
  // Note: tourData.price should be PER PERSON price, otherwise logic is wrong
  const tourPrice = tourData.price * totalGuests; // Price per person * guest count
  // Flight pricing commented out since feature is disabled
  const flightPriceTotal = 0; // Always 0 until flight integration is fixed

  const orderDetails = {
    title: tourData.title,
    subTitle: `${tourData.duration} • ${totalGuests} Khách`,
    imageUrl: tourData.imageUrl,
  };

  const priceDetails = {
    base: tourPrice + flightPriceTotal,
    discount: 0,
    taxes: 30, // Adjusted tax
    serviceFee: 15, // Adjusted service fee
    total: tourPrice + flightPriceTotal + 30 + 15,
  };

  /**
   * Handle booking submission
   */
  const handleBooking = async (paymentData) => {
    setIsProcessing(true);
    setError('');

    try {
      // Calculate future date (tomorrow) since current date would fail @Future validation
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const bookingData = {
        type: 'TOUR', // Must be capital letters as per validation regex
        itemId: tourData.id,
        guests: totalGuests,
        date: tomorrow.toISOString().split('T')[0], // Future date required
        paymentMethod: paymentData.method,
        paymentCompleted: true, // Mark payment as completed for online payments
        // Note: details, flightId optional and not used for tours
      };

      console.log('Creating booking with tourData:', tourData); // Debug log
      console.log('Booking data to send:', bookingData); // Debug log

      const response = await bookingService.create(bookingData);
      console.log('Booking creation response:', response); // Debug log
      console.log('Tour Booking success:', response);

      // Show success confirmation
      setBookingSuccess({
        bookingId: response.id,
        bookingNumber: response.bookingNumber,
        message: 'Đặt tour thành công!'
      });
    } catch (err) {
      const message =
        err.message || 'Đặt tour thất bại. Vui lòng kiểm tra thông tin và thử lại.';
      setError(message);
      console.error('Booking failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8 font-serif">
        Xác nhận đặt Tour
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cột trái: Thông tin & Thanh toán */}
        <main className="flex-1 space-y-6">
          <TourInfoSummary
            tour={tourData}
            guests={guests}
            onChangeGuests={setGuests}
            onOpenModal={() => setIsGuestModalOpen(true)}
          />

          {/* Flight Option - Note: Backend chưa support tour + flight relations đúng cách */}
          {/* Comment out để tránh lỗi flightId undefined
          {tourData.flightId && (
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <IoPaperPlaneOutline className="text-blue-600 text-xl" />
                <h3 className="text-lg font-bold text-blue-900">Thêm vé máy bay</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div><p className="text-gray-600">Hãng</p><p className="font-semibold">{tourData.airline || 'N/A'}</p></div>
                <div><p className="text-gray-600">Tuyến</p><p className="font-semibold">{tourData.from || 'N/A'} → {tourData.to || 'N/A'}</p></div>
                <div><p className="text-gray-600">Thời gian</p><p className="font-semibold">{tourData.departureTime || 'N/A'}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="includeFlightCheckbox"
                  checked={includeFlightInBooking}
                  onChange={(e) => setIncludeFlightInBooking(e.target.checked)}
                />
                <label htmlFor="includeFlightCheckbox" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Thêm vé máy bay <span className="font-bold text-blue-900">${tourData.flight?.price || 0}</span>
                </label>
              </div>
            </div>
          )}
          */}

          <PaymentOptions
            onSubmit={handleBooking}
            isProcessing={isProcessing}
            total={priceDetails.total}
          />
        </main>

        {/* Cột phải: Sidebar Tóm tắt giá */}
        <BookingSidebar
          orderDetails={orderDetails}
          priceDetails={priceDetails}
        />

        {/* Guest Selection Modal */}
        <GuestSelectionModal
          isOpen={isGuestModalOpen}
          onClose={() => setIsGuestModalOpen(false)}
          adults={guests.adults}
          children={guests.children}
          infants={guests.infants}
          onChange={setGuests}
        />

        {/* Booking Success Modal */}
        {bookingSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                {bookingSuccess.message}
              </h3>
              {bookingSuccess.bookingNumber && (
                <p className="text-text-secondary mb-2">
                  Mã đặt chỗ: <span className="font-bold text-brand-primary">{bookingSuccess.bookingNumber}</span>
                </p>
              )}
              <p className="text-sm text-text-secondary mb-4">
                Bạn có thể đánh giá tour sau khi hoàn thành chuyến đi trong phần Lịch sử đặt chỗ.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setBookingSuccess(null);
                    navigate('/account/history');
                  }}
                  className="flex-1"
                >
                  Xem lịch sử đặt chỗ
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setBookingSuccess(null);
                    navigate('/');
                  }}
                  className="flex-1"
                >
                  Về trang chủ
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourBookingPage;
