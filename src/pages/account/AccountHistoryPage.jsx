import React, { useState } from 'react';
import { FiSend, FiHome, FiMapPin, FiCalendar, FiChevronRight, FiDownload } from 'react-icons/fi';

// Component con: Thẻ vé máy bay
const FlightTicketCard = () => (
  <div className="bg-bg-primary border border-border-primary rounded-lg p-4 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-4">
      <img src="https" alt="Emirates" className="w-12 h-12 rounded-full" />
      <div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span>Newark(EWR)</span>
          <FiSend className="text-brand-primary" />
          <span>Newark(EWR)</span>
        </div>
        <p className="font-semibold text-text-primary mt-1">12:00 pm — 06:00 pm</p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-sm">
        <p className="text-text-secondary">Gate</p>
        <p className="font-semibold text-text-primary">A17</p>
      </div>
      <div className="text-sm">
        <p className="text-text-secondary">Flight no.</p>
        <p className="font-semibold text-text-primary">128</p>
      </div>
      <button className="bg-brand-pale text-brand-primary font-medium py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-opacity-80">
        <FiDownload />
        Download Ticket
      </button>
      <button className="text-text-secondary hover:text-text-primary">
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

// Component con: Thẻ đặt phòng khách sạn
const StayBookingCard = () => (
  <div className="bg-bg-primary border border-border-primary rounded-lg p-4 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-4">
      <img src="https" alt="Hotel" className="w-12 h-12 rounded-lg object-cover" />
      <div>
        <p className="font-semibold text-text-primary">CVK Park Bosphorus Hotel</p>
        <div className="flex items-center gap-2 text-sm text-text-secondary mt-1">
          <FiMapPin className="w-4 h-4" />
          <span>Istanbul, Turkey</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-sm">
        <p className="text-text-secondary">Check in</p>
        <p className="font-semibold text-text-primary">Thur, Dec 8</p>
      </div>
      <div className="text-sm">
        <p className="text-text-secondary">Check out</p>
        <p className="font-semibold text-text-primary">Fri, Dec 9</p>
      </div>
      <button className="bg-brand-pale text-brand-primary font-medium py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-opacity-80">
        <FiDownload />
        Download Ticket
      </button>
      <button className="text-text-secondary hover:text-text-primary">
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const AccountHistoryPage = () => {
  const [activeTab, setActiveTab] = useState('flights'); // 'flights' hoặc 'stays'

  return (
    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-6">Tickets/Bookings</h3>

      {/* Tabs (Flights / Stays) */}
      <div className="flex items-center border-b border-border-primary mb-6">
        <button
          onClick={() => setActiveTab('flights')}
          className={`flex items-center gap-2 py-3 px-4 font-medium border-b-2
            ${activeTab === 'flights' 
              ? 'border-brand-primary text-brand-primary' 
              : 'border-transparent text-text-secondary hover:text-text-primary'}
          `}
        >
          <FiSend />
          <span>Flights</span>
        </button>
        <button
          onClick={() => setActiveTab('stays')}
          className={`flex items-center gap-2 py-3 px-4 font-medium border-b-2
            ${activeTab === 'stays' 
              ? 'border-brand-primary text-brand-primary' 
              : 'border-transparent text-text-secondary hover:text-text-primary'}
          `}
        >
          <FiHome />
          <span>Stays</span>
        </button>
      </div>

      {/* Nội dung Tab */}
      <div className="space-y-4">
        {activeTab === 'flights' && (
          <>
            <FlightTicketCard />
            <FlightTicketCard />
            <FlightTicketCard />
          </>
        )}
        
        {activeTab === 'stays' && (
          <>
            <StayBookingCard />
            <StayBookingCard />
          </>
        )}
      </div>
    </div>
  );
};

export default AccountHistoryPage;