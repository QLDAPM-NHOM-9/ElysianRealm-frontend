import React from 'react';
import { FiCalendar, FiMapPin, FiUsers, FiRepeat } from 'react-icons/fi';

// Component con cho các ô input
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

const FlightSearchForm = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg">
      <SearchInput 
        icon={<FiMapPin className="text-brand-primary" />} 
        label="From - To" 
        value="Lahore - Karachi" 
      />
      <SearchInput 
        icon={<FiRepeat className="text-brand-primary" />} 
        label="Trip" 
        value="Return" 
      />
      <SearchInput 
        icon={<FiCalendar className="text-brand-primary" />} 
        label="Depart - Return" 
        value="07 Nov 22 - 13 Nov 22" 
      />
      <SearchInput 
        icon={<FiUsers className="text-brand-primary" />} 
        label="Passenger - Class" 
        value="1 Passenger, Economy" 
      />
    </div>
  );
};

export default FlightSearchForm;