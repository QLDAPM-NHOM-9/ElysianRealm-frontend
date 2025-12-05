import React, { useState, useEffect } from 'react';
import { FiCalendar, FiMapPin, FiUsers, FiHome } from 'react-icons/fi';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';
import Spinner from '../common/Spinner.jsx';
import { homeApi } from '../../services/api.js';

const TourSearchForm = ({ data, onChange }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await homeApi.getDestinations();
        setDestinations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load destinations', error);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Destination (Select) */}
      <div className="relative lg:col-span-2">
        <label className="block text-xs font-bold text-text-primary uppercase mb-1 ml-1">Destination</label>
        <div className="relative">
          {loading ? (
            <Spinner size="sm" />
          ) : (
            <Select 
              id="destination" 
              value={data.destination}
              onChange={(e) => onChange('destination', e.target.value)}
              className="[&_select]:pl-10 [&_select]:py-3 [&_select]:bg-bg-secondary [&_select]:border-none"
            >
              <option value="">Select Destination</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.name}>{dest.name}</option>
              ))}
            </Select>
          )}
          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary pointer-events-none" />
        </div>
      </div>

      {/* 2. Check In (Date) */}
      <div className="relative">
        <label className="block text-xs font-bold text-text-primary uppercase mb-1 ml-1">Check In</label>
        <Input 
          id="checkIn" 
          type="date"
          value={data.checkIn}
          onChange={(e) => onChange('checkIn', e.target.value)}
          className="[&_input]:py-3 [&_input]:bg-bg-secondary [&_input]:border-none"
        />
      </div>

      {/* 3. Check Out (Date) */}
      <div className="relative">
        <label className="block text-xs font-bold text-text-primary uppercase mb-1 ml-1">Check Out</label>
        <Input 
          id="checkOut" 
          type="date"
          value={data.checkOut}
          onChange={(e) => onChange('checkOut', e.target.value)}
          className="[&_input]:py-3 [&_input]:bg-bg-secondary [&_input]:border-none"
        />
      </div>

      {/* 4. Rooms (Number) */}
      <div className="relative">
        <label className="block text-xs font-bold text-text-primary uppercase mb-1 ml-1">Rooms</label>
        <Input 
          id="rooms" 
          type="number"
          min="1"
          placeholder="1"
          value={data.rooms}
          onChange={(e) => onChange('rooms', e.target.value)}
          icon={<FiHome />}
          className="[&_input]:py-3 [&_input]:bg-bg-secondary [&_input]:border-none"
        />
      </div>

      {/* 5. Guests (Number) */}
      <div className="relative">
        <label className="block text-xs font-bold text-text-primary uppercase mb-1 ml-1">Guests</label>
        <Input 
          id="guests" 
          type="number"
          min="1"
          placeholder="2"
          value={data.guests}
          onChange={(e) => onChange('guests', e.target.value)}
          icon={<FiUsers />}
          className="[&_input]:py-3 [&_input]:bg-bg-secondary [&_input]:border-none"
        />
      </div>

    </div>
  );
};

export default TourSearchForm;