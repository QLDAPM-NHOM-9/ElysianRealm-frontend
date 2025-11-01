import React from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiShare2, FiMapPin, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Button from '../../components/common/Button.jsx';
import logoIcon from '../../assets/icons/Elysia.png';

// Tái sử dụng component footer từ FlightTicketPage
// (Hoặc bạn có thể tách ra file riêng src/components/listings/TicketFooter.jsx)
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

const HotelTicketPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header (Giá và Nút) */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-3xl font-bold text-brand-secondary">$265</span>
        <div className="flex gap-2">
          <Button variant="outline" isIconOnly={true} className="w-12 h-12 rounded-lg"><FiShare2 /></Button>
          <Button variant="primary" className="px-6 h-12 rounded-lg flex items-center gap-2">
            <FiDownload /> Download
          </Button>
        </div>
      </div>

      {/* Vé khách sạn */}
      <div className="bg-bg-primary rounded-2xl shadow-lg border border-border-primary p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-1">CVK Park Bosphorus Hotel Istanbul</h2>
        <div className="flex items-center gap-2 text-text-secondary mb-6">
          <FiMapPin className="w-4 h-4" />
          <span>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</span>
        </div>

        {/* Thông tin vé */}
        <div className="flex border border-border-primary rounded-lg">
          {/* Phần trái: Chi tiết */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start pb-6 border-b border-border-primary">
              <div>
                <p className="text-xs text-text-secondary uppercase">Check-in</p>
                <p className="text-3xl font-bold text-text-primary">Thur, Dec 8</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase">Check-out</p>
                <p className="text-3xl font-bold text-text-primary">Fri, Dec 9</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase">Room type</p>
                <p className="font-semibold text-text-primary">Superior room</p>
                <p className="text-sm text-text-secondary">1 double bed or 2 twin beds</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-6">
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Guest</p>
                <div className="flex items-center gap-2">
                  <FiUser className="text-text-primary" />
                  <span className="font-semibold text-text-primary">James Doe</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Check-in time</p>
                <div className="flex items-center gap-2">
                  <FiClock className="text-text-primary" />
                  <span className="font-semibold text-text-primary">12:00pm</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Room no.</p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary">On arrival</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Phần phải: Barcode */}
          <div className="w-32 border-l border-dashed border-border-primary flex flex-col items-center justify-center p-4 gap-2">
            <img src={logoIcon} alt="Elysian Realm" className="h-12 w-12 rounded-full" />
            <p className="text-xs text-text-secondary text-center">CVK Park Bosphorus Hotel</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ElysianRealmTicket456" alt="Barcode" className="w-full" />
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <TicketFooter />
    </div>
  );
};

export default HotelTicketPage;