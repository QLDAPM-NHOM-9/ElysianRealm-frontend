import React from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiShare2, FiMapPin } from 'react-icons/fi';
import Button from '../../components/common/Button.jsx';
import logoIcon from '../../assets/icons/Elysia.png'; // Import logo for barcode

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
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header (Giá và Nút) */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-3xl font-bold text-brand-secondary">$240</span>
        <div className="flex gap-2">
          <Button variant="outline" isIconOnly={true} className="w-12 h-12 rounded-lg"><FiShare2 /></Button>
          <Button variant="primary" className="px-6 h-12 rounded-lg flex items-center gap-2">
            <FiDownload /> Download
          </Button>
        </div>
      </div>

      {/* Vé máy bay */}
      <div className="bg-bg-primary rounded-2xl shadow-lg border border-border-primary p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-1">Emirates A380 Airbus</h2>
        <div className="flex items-center gap-2 text-text-secondary mb-6">
          <FiMapPin className="w-4 h-4" />
          <span>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</span>
        </div>

        {/* Thông tin vé */}
        <div className="flex border border-border-primary rounded-lg">
          {/* Phần trái: Chi tiết */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold text-text-primary">12:00 <span className="text-xl font-medium text-text-secondary">pm</span></p>
                <p className="text-text-secondary">Newark(EWR)</p>
              </div>
              <span className="text-sm text-text-secondary">Business Class</span>
            </div>
            
            <div className="flex items-center gap-4 my-6">
              <img src="https" alt="Emirates" className="h-10" />
              <div className="flex-1 border-t border-dashed border-border-primary" />
              <span className="text-sm text-text-secondary">2h 28m</span>
              <div className="flex-1 border-t border-dashed border-border-primary" />
              <img src={logoIcon} alt="Elysian Realm" className="h-10 w-10 rounded-full" />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold text-text-primary">02:28 <span className="text-xl font-medium text-text-secondary">pm</span></p>
                <p className="text-text-secondary">Newark(EWR)</p>
              </div>
            </div>

            <div className="flex gap-8 mt-8 pt-6 border-t border-border-primary">
              <div>
                <p className="text-xs text-text-secondary uppercase">Passenger</p>
                <p className="font-semibold text-text-primary">James Doe</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase">Gate</p>
                <p className="font-semibold text-text-primary">A12</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase">Seat</p>
                <p className="font-semibold text-text-primary">12B</p>
              </div>
            </div>
          </div>
          
          {/* Phần phải: Barcode */}
          <div className="w-32 border-l border-dashed border-border-primary flex items-center justify-center p-4">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ElysianRealmTicket123" alt="Barcode" className="w-full" />
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <TicketFooter />
    </div>
  );
};

export default FlightTicketPage;