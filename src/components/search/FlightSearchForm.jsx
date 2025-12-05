import React from 'react';
import { FiCalendar, FiMapPin, FiUsers, FiRepeat, FiBriefcase } from 'react-icons/fi';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';

// ⚠️ NOTE: AIRPORTS are static data codes - these don't change
// In future, if backend needs to provide airport list, this can be moved to API
// Currently keeping hardcoded as these are standard IATA airport codes
const AIRPORTS = [
  { code: 'EWR', name: 'Newark (EWR)' },
  { code: 'JFK', name: 'New York (JFK)' },
  { code: 'LHE', name: 'Lahore (LHE)' },
  { code: 'KHI', name: 'Karachi (KHI)' },
  { code: 'IST', name: 'Istanbul (IST)' },
  { code: 'DXB', name: 'Dubai (DXB)' },
  { code: 'LHR', name: 'London (LHR)' },
  { code: 'SGN', name: 'Ho Chi Minh (SGN)' },
  { code: 'HAN', name: 'Ha Noi (HAN)' },
];

// ⚠️ NOTE: Flight classes are standard worldwide (Economy, Business, First Class)
// These don't change and don't come from backend
const CLASSES = ['Economy', 'Business', 'First Class'];
const TRIP_TYPES = ['Return', 'One Way'];

const FlightSearchForm = ({ data, onChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. From (Select) */}
      <div className="relative">
        <label className="block text-xs font-bold text-text-primary uppercase mb-1 ml-1">From</label>
        <div className="relative">
          <Select
            id="from"
            value={data.from}
            onChange={(e) => onChange('from', e.target.value)}
            className="[&_select]:pl-10 [&_select]:py-3 [&_select]:bg-bg-secondary [&_select]:border-none"
          >
            <option value="">Select Airport</option>
            {AIRPORTS.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.name}
              </option>
            ))}
          </Select>
          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary pointer-events-none" />
        </div>
      </div>

      {/* 2. To (Select) */}
      <div className="relative">
        <label className="block text-xs font-bold text-text-primary uppercase mb-1 ml-1">To</label>
        <div className="relative">
          <Select
            id="to"
            value={data.to}
            onChange={(e) => onChange('to', e.target.value)}
            className="[&_select]:pl-10 [&_select]:py-3 [&_select]:bg-bg-secondary [&_select]:border-none"
          >
            <option value="">Select Airport</option>
            {AIRPORTS.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.name}
              </option>
            ))}
          </Select>
          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary pointer-events-none" />
        </div>
      </div>

      {/* 3. Trip Type (Select) */}
      <div className="relative">
        <label className="block text-xs font-bold text-text-primary uppercase mb-1 ml-1">Trip</label>
        <div className="relative">
          <Select
            id="tripType"
            value={data.tripType}
            onChange={(e) => onChange('tripType', e.target.value)}
            className="[&_select]:pl-10 [&_select]:py-3 [&_select]:bg-bg-secondary [&_select]:border-none"
          >
            {TRIP_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
          <FiRepeat className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary pointer-events-none" />
        </div>
      </div>

      {/* 4. Depart Date (Date Picker) */}
      <div className="relative">
        <label className="block text-xs font-bold text-text-primary uppercase mb-1 ml-1">Depart</label>
        <Input 
          id="departDate" 
          type="date"
          value={data.departDate}
          onChange={(e) => onChange('departDate', e.target.value)}
          className="[&_input]:py-3 [&_input]:bg-bg-secondary [&_input]:border-none"
        />
      </div>

      {/* 5. Return Date (Date Picker) - Ẩn nếu là One Way */}
      {data.tripType === 'Return' && (
        <div className="relative">
          <label className="block text-xs font-bold text-text-primary uppercase mb-1 ml-1">Return</label>
          <Input 
            id="returnDate" 
            type="date"
            value={data.returnDate}
            onChange={(e) => onChange('returnDate', e.target.value)}
            className="[&_input]:py-3 [&_input]:bg-bg-secondary [&_input]:border-none"
          />
        </div>
      )}

      {/* 6. Passengers (Number) */}
      <div className="relative">
        <label className="block text-xs font-bold text-text-primary uppercase mb-1 ml-1">Passengers</label>
        <Input 
          id="passengers" 
          type="number"
          min="1"
          placeholder="1"
          value={data.passengers}
          onChange={(e) => onChange('passengers', e.target.value)}
          icon={<FiUsers />}
          className="[&_input]:py-3 [&_input]:bg-bg-secondary [&_input]:border-none"
        />
      </div>

      {/* 7. Class (Select) */}
      <div className="relative">
        <label className="block text-xs font-bold text-text-primary uppercase mb-1 ml-1">Class</label>
        <div className="relative">
          <Select
            id="classType"
            value={data.classType}
            onChange={(e) => onChange('classType', e.target.value)}
            className="[&_select]:pl-10 [&_select]:py-3 [&_select]:bg-bg-secondary [&_select]:border-none"
          >
            {CLASSES.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </Select>
          <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary pointer-events-none" />
        </div>
      </div>

    </div>
  );
};

export default FlightSearchForm;