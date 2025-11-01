import React from 'react';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

// Component con cho các ô input (tái sử dụng từ FlightSearchForm)
const SearchInput = ({ icon, label, value }) => (
  <div className="flex-1 p-4 border-r border-border-primary last:border-r-0">
    <label className="text-xs text-text-tertiary">{label}</label>
    <div className="flex items-center gap-2 mt-1">
      {icon}
      <input 
        type="text"
        defaultValue={value}
        className="w-full text-lg font-semibold text-text-primary bg-transparent border-none p-0 focus:ring-0"
        placeholder={label}
      />
    </div>
  </div>
);

const HotelSearchForm = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg">
      <SearchInput 
        icon={<FiMapPin className="text-brand-primary" />} 
        label="Enter Destination" 
        value="Istanbul, Turkey" 
      />
      <SearchInput 
        icon={<FiCalendar className="text-brand-primary" />} 
        label="Check In" 
        value="Fri 12/2" 
      />
      <SearchInput 
        icon={<FiCalendar className="text-brand-primary" />} 
        label="Check Out" 
        value="Sun 12/4" 
      />
      <SearchInput 
        icon={<FiUsers className="text-brand-primary" />} 
        label="Rooms & Guests" 
        value="1 Room, 2 Guests" 
      />
    </div>
  );
};

export default HotelSearchForm;