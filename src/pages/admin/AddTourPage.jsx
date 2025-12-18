import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Spinner from '../../components/common/Spinner';
import tourService from '../../services/tourService';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AddTourPage = () => {
  const navigate = useNavigate();
  const { id: tourId } = useParams(); // Check if we're in edit mode
  const isEditMode = !!tourId;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    imageUrl: '',
    duration: '',
    startDate: '',
    itinerary: [''],
    gallery: ['']
  });

  // Load tour data if editing
  useEffect(() => {
    if (isEditMode && tourId) {
      const loadTourData = async () => {
        try {
          setInitialLoading(true);
          console.log('Loading tour data for ID:', tourId);

          const tourData = await tourService.getById(tourId);
          console.log('API Response:', tourData);

          // The API response structure might be different
          const tour = tourData?.data || tourData;

          if (tour && tour.title) {
            console.log('Loading tour data:', tour);
            setFormData({
              title: tour.title || '',
              location: tour.location || '',
              price: tour.price ? tour.price.toString() : '',
              description: tour.description || '',
              imageUrl: tour.imageUrl || '',
              duration: tour.duration || '',
              startDate: tour.startDate ? tour.startDate.split('T')[0] : '', // Handle date format
              itinerary: Array.isArray(tour.itinerary) && tour.itinerary.length > 0 ? tour.itinerary : [''],
              gallery: Array.isArray(tour.gallery) && tour.gallery.length > 0 ? tour.gallery : ['']
            });
            console.log('Form data set successfully');
          } else {
            console.error('Invalid tour data structure:', tour);
            throw new Error('Invalid tour data');
          }
        } catch (error) {
          console.error('Error loading tour data:', error);
          toast.error('Không thể tải dữ liệu tour: ' + (error.message || 'Dữ liệu không hợp lệ'));
          navigate('/admin/tours');
        } finally {
          setInitialLoading(false);
        }
      };
      loadTourData();
    } else {
      setInitialLoading(false);
    }
  }, [isEditMode, tourId, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItineraryChange = (index, value) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index] = String(value || '');
    setFormData(prev => ({
      ...prev,
      itinerary: newItinerary
    }));
  };

  const handleGalleryChange = (index, value) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = String(value || '');
    setFormData(prev => ({
      ...prev,
      gallery: newGallery
    }));
  };

  const addItineraryItem = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, '']
    }));
  };

  const removeItineraryItem = (index) => {
    if (formData.itinerary.length > 1) {
      setFormData(prev => ({
        ...prev,
        itinerary: prev.itinerary.filter((_, i) => i !== index)
      }));
    }
  };

  const addGalleryItem = () => {
    setFormData(prev => ({
      ...prev,
      gallery: [...prev.gallery, '']
    }));
  };

  const removeGalleryItem = (index) => {
    if (formData.gallery.length > 1) {
      setFormData(prev => ({
        ...prev,
        gallery: prev.gallery.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.location || !formData.price || !formData.description) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setLoading(true);
    try {
      // Filter out empty values from arrays
      const cleanFormData = {
        ...formData,
        price: parseFloat(formData.price),
        itinerary: formData.itinerary.filter(item => item.trim() !== ''),
        gallery: formData.gallery.filter(item => item.trim() !== ''),
        startDate: formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : null
      };

      if (isEditMode) {
        await tourService.update(tourId, cleanFormData);
        toast.success('Cập nhật tour thành công!');
      } else {
        await tourService.create(cleanFormData);
        toast.success('Thêm tour thành công!');
      }
      navigate('/admin/tours');
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} tour:`, error);
      toast.error(`Lỗi khi ${isEditMode ? 'cập nhật' : 'thêm'} tour: ` + (error.message || 'Vui lòng thử lại'));
    } finally {
      setLoading(false);
    }
  };

  // Show loading while initially loading tour data in edit mode
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
        <span className="ml-3">Đang tải dữ liệu tour...</span>
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
            onClick={() => navigate('/admin/tours')}
            className="flex items-center gap-2"
          >
            <FiArrowLeft /> Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-text-primary font-serif">
              {isEditMode ? 'Chỉnh sửa Tour' : 'Thêm Tour Mới'}
            </h1>
            <p className="text-text-secondary mt-1">
              {isEditMode ? 'Cập nhật thông tin tour' : 'Điền thông tin để tạo tour mới'}
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
              label="Tên Tour *"
              value={formData.title}
              onChange={(value) => handleInputChange('title', value)}
              placeholder="Nhập tên tour"
              required
            />

            <Input
              label="Địa điểm *"
              value={formData.location}
              onChange={(value) => handleInputChange('location', value)}
              placeholder="Nhập địa điểm"
              required
            />

            <Input
              label="Giá (USD) *"
              type="number"
              value={formData.price}
              onChange={(value) => handleInputChange('price', value)}
              placeholder="Nhập giá tour"
              required
            />

            <Input
              label="Thời lượng"
              value={formData.duration}
              onChange={(value) => handleInputChange('duration', value)}
              placeholder="Ví dụ: 3 ngày 2 đêm"
            />

            <Input
              label="Ngày khởi hành"
              type="date"
              value={formData.startDate}
              onChange={(value) => handleInputChange('startDate', value)}
            />

            <Input
              label="URL Hình ảnh chính"
              value={formData.imageUrl}
              onChange={(value) => handleInputChange('imageUrl', value)}
              placeholder="Nhập URL hình ảnh"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Mô tả *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
              placeholder="Mô tả về tour"
              required
            />
          </div>

          {/* Itinerary */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Lịch trình
            </label>
            {formData.itinerary.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={item}
                  onChange={(value) => handleItineraryChange(index, value)}
                  placeholder="Nhập hoạt động trong ngày"
                  className="flex-1"
                />
                {formData.itinerary.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeItineraryItem(index)}
                    className="px-3 py-2"
                  >
                    -
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addItineraryItem}
              className="mt-2"
            >
              + Thêm hoạt động
            </Button>
          </div>

          {/* Gallery */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Gallery hình ảnh
            </label>
            {formData.gallery.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={item}
                  onChange={(value) => handleGalleryChange(index, value)}
                  placeholder="Nhập URL hình ảnh"
                  className="flex-1"
                />
                <div className="flex items-center gap-1">
                  <FiUpload className="text-text-secondary" />
                  {formData.gallery.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeGalleryItem(index)}
                      className="px-3 py-2"
                    >
                      -
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addGalleryItem}
              className="mt-2"
            >
              + Thêm hình ảnh
            </Button>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" disabled={loading} className="flex items-center gap-2">
              {loading && <Spinner size="sm" />}
              {loading ? (isEditMode ? 'Đang cập nhật...' : 'Đang tạo...') : (isEditMode ? 'Cập nhật Tour' : 'Tạo Tour')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/tours')}
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

export default AddTourPage;
