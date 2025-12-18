import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiClock, FiArrowRight } from 'react-icons/fi';
import Button from '../common/Button.jsx';

const FlightCard = ({
  id,
  airline,
  from,
  to,
  departureTime,
  arrivalTime,
  duration,
  price,
  logoUrl,
  availableSeats,
  flightNumber
}) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/flight-booking', {
      state: {
        flight: {
          id,
          airline,
          from,
          to,
          departureTime,
          arrivalTime,
          duration,
          price,
          logoUrl,
          availableSeats,
          flightNumber
        }
      }
    });
  };

  // Format time to HH:mm AM/PM format
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate duration in hours and minutes
  const formatDuration = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-bg-primary rounded-lg shadow-sm border border-border-primary overflow-hidden flex flex-col md:flex-row">
      {/* Logo and airline section */}
      <div className="w-full md:w-1/3 bg-gray-50">
        <div className="p-4 flex items-center gap-3">
          {logoUrl && (
            <img src={logoUrl} alt={airline} className="h-12 w-12 object-contain" />
          )}
          <div>
            <h3 className="text-lg font-bold text-text-primary">{airline}</h3>
            <p className="text-sm text-text-secondary">
              {flightNumber && `Flight ${flightNumber}`}
            </p>
          </div>
        </div>
      </div>

      {/* Flight details section */}
      <div className="w-full md:w-2/3 p-4 flex flex-col">
        {/* Route and flight info */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <div className="text-center">
                <p className="text-lg font-bold text-text-primary">{formatTime(departureTime)}</p>
                <p className="text-sm text-text-secondary">{from}</p>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-px bg-border-primary"></div>
                <FiArrowRight className="text-brand-primary flex-shrink-0" />
                <div className="flex-1 h-px bg-border-primary"></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-text-primary">{formatTime(arrivalTime)}</p>
                <p className="text-sm text-text-secondary">{to}</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary text-center">
              {formatDate(departureTime)} • Direct flight • {formatDuration(duration)}
            </p>
          </div>
          <button className="w-9 h-9 flex-shrink-0 flex items-center justify-center border border-border-primary rounded-full text-text-secondary hover:bg-brand-pale hover:text-brand-primary">
            <FiHeart />
          </button>
        </div>

        {/* Flight details and price */}
        <div className="flex flex-wrap gap-4 mb-3 text-sm text-text-secondary">
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            <span>{formatDuration(duration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiArrowRight className="w-4 h-4" />
            <span>{airline} • {flightNumber}</span>
          </div>
          {availableSeats && (
            <div className="text-brand-primary font-semibold">
              {availableSeats} seats available
            </div>
          )}
        </div>

        {/* Price and booking button */}
        <div className="flex justify-between items-end mt-auto">
          <div className="text-left">
            <p className="text-xs text-text-secondary">starting from</p>
            <p className="text-2xl font-bold text-brand-secondary">${price}<span className="text-sm font-normal text-text-secondary">/person</span></p>
            <p className="text-xs text-text-secondary">Economy</p>
          </div>

          <Button
            variant="secondary"
            className="px-8"
            onClick={handleBooking}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
