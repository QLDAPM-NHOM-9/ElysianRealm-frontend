import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiChevronRight, FiShare2, FiStar, FiMapPin, FiClock, FiSend, FiUsers, FiBriefcase } from 'react-icons/fi';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import Button from '../../components/common/Button.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import flightService from '../../services/flightService.js';
import tourService from '../../services/tourService.js';
import { useAuth } from '../../contexts/AuthContext.jsx';

// Component con: Thông tin chuyến bay
const FlightInfoCard = ({ flight }) => (
  <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
          <IoPaperPlaneOutline className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary">{flight.airline}</h3>
          <p className="text-sm text-text-secondary">{flight.flightNumber}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-text-secondary">Economy</p>
        <p className="text-xl font-bold text-brand-secondary">${flight.price}</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4 py-4 border-t border-border-primary">
      <div className="text-center">
        <p className="text-sm text-text-secondary">{flight.departureTime}</p>
        <p className="font-bold text-text-primary">{flight.from}</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex-1 border-t border-border-primary relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2">
            <FiSend className="text-brand-primary" />
          </div>
        </div>
        <p className="text-xs text-text-secondary mx-2">{flight.duration}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-text-secondary">{flight.arrivalTime}</p>
        <p className="font-bold text-text-primary">{flight.to}</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4 text-center text-sm text-text-secondary border-t border-border-primary pt-4">
      <div className="flex items-center justify-center gap-1">
        <FiSend className="w-4 h-4" />
        <span>Direct</span>
      </div>
      <div className="flex items-center justify-center gap-1">
        <FiUsers className="w-4 h-4" />
        <span>Baggage included</span>
      </div>
      <div className="flex items-center justify-center gap-1">
        <FiBriefcase className="w-4 h-4" />
        <span>Economy</span>
      </div>
    </div>
  </div>
);

// Component con: Thẻ review
const ReviewCard = ({ author, text, rating, avatar, createdAt }) => (
  <div className="border-b border-border-primary py-4">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-3">
        <img
          src={avatar || `https://ui-avatars.com/api/?name=${author}&background=random`}
          alt={author}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h5 className="font-semibold text-text-primary">{author}</h5>
          <p className="text-sm text-text-secondary">
            {createdAt ? new Date(createdAt).toLocaleDateString() : 'Recent'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-sm font-medium bg-brand-primary text-white py-1 px-2 rounded">
        {rating} <FiStar className="w-3 h-3 fill-current" />
      </div>
    </div>
    <p className="text-text-secondary">{text}</p>
  </div>
);

const FlightDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [flight, setFlight] = useState(null);
  const [availableTours, setAvailableTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlight = async () => {
      setLoading(true);
      try {
        const flightData = await flightService.getById(id);
        setFlight(flightData);

        // Fetch related tours for the destination
        if (flightData.to) {
          const tours = await tourService.search(flightData.to, '');
          setAvailableTours(tours.slice(0, 3)); // Show first 3 tours
        }
      } catch (err) {
        console.error('Failed to fetch flight:', err);
        setError('Flight not found or failed to load flight details.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [id]);

  if (loading) return <div className="h-screen flex justify-center items-center"><Spinner size="lg" /></div>;
  if (!flight || error) return (
    <div className="container mx-auto px-4 py-8 text-center">
      <p className="text-text-secondary text-lg">{error || 'Flight not found.'}</p>
      <Link to="/flight-listing" className="text-brand-primary hover:underline mt-4 inline-block">
        Back to flight search
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-text-secondary mb-4">
        <Link to="/" className="hover:underline">Home</Link>
        <FiChevronRight className="mx-1" />
        <Link to="/flight-listing" className="hover:underline">Flights</Link>
        <FiChevronRight className="mx-1" />
        <span className="text-text-primary font-medium">Flight Details</span>
      </nav>

      <FlightInfoCard flight={flight} />

      {/* Book Flight Button */}
      <div className="mt-8 text-center">
        <Link to="/flight-booking" state={{ flight }}>
          <Button variant="primary" size="lg" className="px-8">
            Book This Flight
          </Button>
        </Link>
      </div>

      {/* Related Tours */}
      {availableTours.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-text-primary mb-6">
            Tours available in {flight.to}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTours.map((tour) => (
              <div key={tour.id} className="bg-bg-primary rounded-lg shadow-sm border border-border-primary overflow-hidden">
                <img
                  src={tour.imageUrl}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-text-primary mb-2">{tour.title}</h4>
                  <p className="text-sm text-text-secondary mb-3">${tour.price}/person</p>
                  <Link to={`/tour-detail/${tour.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Tour
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flight Policies */}
      <div className="mt-12 space-y-6">
        <div className="bg-bg-primary rounded-lg shadow-sm border border-border-primary p-6">
          <h3 className="text-xl font-bold text-text-primary mb-4">Baggage Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Carry-on baggage</span>
              <span>Included (max 7kg)</span>
            </div>
            <div className="flex justify-between">
              <span>Checked baggage</span>
              <span>$25 extra (max 20kg)</span>
            </div>
          </div>
        </div>

        <div className="bg-bg-primary rounded-lg shadow-sm border border-border-primary p-6">
          <h3 className="text-xl font-bold text-text-primary mb-4">Cancellation Policy</h3>
          <p className="text-text-secondary">
            Free cancellation up to 24 hours before departure. Cancellations within 24 hours will incur a 50% fee.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailPage;
