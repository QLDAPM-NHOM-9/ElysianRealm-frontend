import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Spinner from '../../components/common/Spinner';
import flightService from '../../services/flightService';
import { FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Predefined airports list - same as FlightSearchForm
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

const AddFlightPage = () => {
  const navigate = useNavigate();
  const { id: flightId } = useParams(); // Check if we're in edit mode
  const isEditMode = !!flightId;

  console.log('AddFlightPage - flightId:', flightId, 'isEditMode:', isEditMode);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    airline: '',
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    availableSeats: '',
    logoUrl: '',
    flightNumber: '',
    duration: ''
  });

  // Load flight data if editing
  useEffect(() => {
    if (isEditMode && flightId) {
      const loadFlightData = async () => {
        try {
          setInitialLoading(true);
          console.log('Loading flight data for ID:', flightId);
          const flightData = await flightService.getById(flightId);
          console.log('Flight data received:', flightData);

          if (flightData) {
            const flight = flightData;
            console.log('Flight object:', flight);

            const newFormData = {
              airline: flight.airline || '',
              from: flight.from || '',
              to: flight.to || '',
              departureTime: flight.departureTime ? new Date(flight.departureTime).toISOString().slice(0, -1) : '',
              arrivalTime: flight.arrivalTime ? new Date(flight.arrivalTime).toISOString().slice(0, -1) : '',
              price: flight.price ? flight.price.toString() : '',
              availableSeats: flight.availableSeats ? flight.availableSeats.toString() : '',
              logoUrl: flight.logoUrl || '',
              flightNumber: flight.flightNumber || '',
              duration: flight.duration ? flight.duration.toString() : ''
            };

            console.log('Setting form data:', newFormData);
            setFormData(newFormData);
          } else {
            console.error('No flight data found in response:', flightData);
          }
        } catch (error) {
          console.error('Error loading flight data:', error);
          toast.error('Không thể tải dữ liệu chuyến bay');
          navigate('/admin/flights');
        } finally {
          setInitialLoading(false);
        }
      };
      loadFlightData();
    } else {
      setInitialLoading(false);
    }
  }, [isEditMode, flightId, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      // Auto-calculate arrival time when departure time or duration changes
      if (field === 'departureTime' || field === 'duration') {
        if (updated.departureTime && updated.duration && parseInt(updated.duration) > 0) {
          // Parse departure time in local timezone
          const departure = new Date(updated.departureTime + ':00'); // Add seconds if missing
          const durationMinutes = parseInt(updated.duration);

          // Calculate arrival time by setting minutes
          const arrival = new Date(departure);
          arrival.setMinutes(arrival.getMinutes() + durationMinutes);

          // Format back to datetime-local format (YYYY-MM-DDTHH:mm)
          const year = arrival.getFullYear();
          const month = String(arrival.getMonth() + 1).padStart(2, '0');
          const day = String(arrival.getDate()).padStart(2, '0');
          const hours = String(arrival.getHours()).padStart(2, '0');
          const minutes = String(arrival.getMinutes()).padStart(2, '0');

          updated.arrivalTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        }
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.airline || !formData.from || !formData.to || !formData.departureTime || !formData.duration || !formData.price) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setLoading(true);
    try {
      // Try with multipart upload endpoint which we know works
      const flightData = {
        airline: formData.airline,
        from: formData.from,
        to: formData.to,
        departureTime: new Date(formData.departureTime).toISOString(),
        arrivalTime: new Date(formData.arrivalTime).toISOString(),
        price: parseFloat(formData.price),
        availableSeats: formData.availableSeats ? parseInt(formData.availableSeats) : 0,
        logoUrl: formData.logoUrl || null,
        flightNumber: formData.flightNumber || null,
        duration: parseInt(formData.duration),
        rating: 0.0,
        reviewCount: 0
      };

      // Create FormData for multipart upload with upload endpoint
      const formDataToSend = new FormData();
      const dataBlob = new Blob([JSON.stringify(flightData)], {
        type: 'application/json'
      });
      formDataToSend.append('data', dataBlob);

      if (isEditMode) {
        await flightService.update(flightId, formDataToSend);
        toast.success('Cập nhật chuyến bay thành công!');
      } else {
        await flightService.create(formDataToSend);
        toast.success('Thêm chuyến bay thành công!');
      }
      navigate('/admin/flights');
    } catch (error) {
      console.error('Error creating flight:', error);
      toast.error('Lỗi khi thêm chuyến bay: ' + (error.message || 'Vui lòng thử lại'));
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
        <span className="ml-3 text-text-secondary">Đang tải dữ liệu chuyến bay...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/flights')}
            className="flex items-center gap-2"
          >
            <FiArrowLeft /> Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-text-primary font-serif">
              {isEditMode ? 'Chỉnh Sửa Chuyến Bay' : 'Thêm Chuyến Bay Mới'}
            </h1>
            <p className="text-text-secondary mt-1">
              {isEditMode ? 'Cập nhật thông tin chuyến bay' : 'Điền thông tin để tạo chuyến bay mới'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-bg-primary rounded-xl shadow-sm border border-border-primary p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Hãng bay *"
              value={formData.airline}
              onChange={(value) => handleInputChange('airline', value)}
              placeholder="Ví dụ: Vietnam Airlines"
              required
            />

            <Input
              label="Số hiệu chuyến bay"
              value={formData.flightNumber}
              onChange={(value) => handleInputChange('flightNumber', value)}
              placeholder="Ví dụ: VN123"
            />

            <Select
              label="Từ *"
              value={formData.from}
              onChange={(value) => handleInputChange('from', value)}
              required
            >
              <option value="">Chọn sân bay khởi hành</option>
              {AIRPORTS.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.name}
                </option>
              ))}
            </Select>

            <Select
              label="Đến *"
              value={formData.to}
              onChange={(value) => handleInputChange('to', value)}
              required
            >
              <option value="">Chọn sân bay đích</option>
              {AIRPORTS.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.name}
                </option>
              ))}
            </Select>

            <Input
              label="Thời gian khởi hành *"
              type="datetime-local"
              value={formData.departureTime}
              onChange={(value) => handleInputChange('departureTime', value)}
              required
            />

            <Input
              label="Thời gian đến (tự động tính)"
              type="datetime-local"
              value={formData.arrivalTime}
              readOnly
            />

            <Input
              label="Giá vé (USD) *"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(value) => handleInputChange('price', value)}
              placeholder="Nhập giá vé"
              required
            />

            <Input
              label="Số ghế trống"
              type="number"
              value={formData.availableSeats}
              onChange={(value) => handleInputChange('availableSeats', value)}
              placeholder="Số ghế còn trống"
            />

            <Input
              label="Thời lượng bay (phút) *"
              type="number"
              value={formData.duration}
              onChange={(value) => handleInputChange('duration', value)}
              placeholder="Thời lượng tính bằng phút"
              required
            />

            <Input
              label="URL Logo hãng bay"
              value={formData.logoUrl}
              onChange={(value) => handleInputChange('logoUrl', value)}
              placeholder="Nhập URL logo"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" disabled={loading} className="flex items-center gap-2">
              {loading && <Spinner size="sm" />}
              {loading ? (isEditMode ? 'Đang cập nhật...' : 'Đang tạo...') : (isEditMode ? 'Cập Nhật Chuyến Bay' : 'Tạo Chuyến Bay')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/flights')}
              disabled={loading}
            >
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlightPage;
