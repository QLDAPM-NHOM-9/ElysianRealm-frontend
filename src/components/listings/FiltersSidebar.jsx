import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Checkbox from '../common/Checkbox.jsx';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';

// Component con: 1 mục filter
const FilterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-border-primary py-4 last:border-b-0">
      <button
        className="w-full flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-semibold text-text-primary">{title}</h4>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && (
        <div className="mt-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
};

const FiltersSidebar = ({ type = 'flight', filterValues, onFilterChange }) => {
  const navigate = useNavigate();

  const handleFilterChange = (filterType, value) => {
    if (onFilterChange) {
      if (filterType === 'duration') {
        const currentDurations = filterValues.duration || [];
        const newDurations = currentDurations.includes(value)
          ? currentDurations.filter(d => d !== value)
          : [...currentDurations, value];
        const newFilterValues = { ...filterValues, duration: newDurations };
        onFilterChange(newFilterValues);
      } else if (filterType === 'destination') {
        const currentDestinations = filterValues.destination || [];
        const newDestinations = currentDestinations.includes(value)
          ? currentDestinations.filter(d => d !== value)
          : [...currentDestinations, value];
        const newFilterValues = { ...filterValues, destination: newDestinations };
        onFilterChange(newFilterValues);
      } else if (filterType === 'airlines') {
        const currentAirlines = filterValues.airlines || [];
        const newAirlines = currentAirlines.includes(value)
          ? currentAirlines.filter(a => a !== value)
          : [...currentAirlines, value];
        const newFilterValues = { ...filterValues, airlines: newAirlines };
        onFilterChange(newFilterValues);
      } else if (filterType === 'departureTime') {
        const currentTimes = filterValues.departureTime || [];
        const newTimes = currentTimes.includes(value)
          ? currentTimes.filter(t => t !== value)
          : [...currentTimes, value];
        const newFilterValues = { ...filterValues, departureTime: newTimes };
        onFilterChange(newFilterValues);
      }
    }
  };

  // Check if a filter is currently selected
  const isFilterSelected = (filterType, value) => {
    if (filterValues) {
      return filterValues[filterType]?.includes(value) || false;
    }
    return false;
  };
  return (
    <aside className="w-full lg:w-72 bg-bg-primary p-6 rounded-lg shadow-sm h-fit">
      <h3 className="text-xl font-bold text-text-primary mb-4">Bộ lọc</h3>

      {/* --- PRICE RANGE FILTER --- */}
      <FilterSection title="Khoảng giá">
        <div className="space-y-4">
          {/* Range Inputs */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-xs text-text-secondary mb-1">Giá từ ($)</label>
              <Input
                type="number"
                value={filterValues.priceRange.min}
                onChange={(value) => onFilterChange({ ...filterValues, priceRange: { ...filterValues.priceRange, min: Number(value) } })}
                className="[&_input]:text-sm [&_input]:py-2"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-text-secondary mb-1">Giá đến ($)</label>
              <Input
                type="number"
                value={filterValues.priceRange.max}
                onChange={(value) => onFilterChange({ ...filterValues, priceRange: { ...filterValues.priceRange, max: Number(value) } })}
                className="[&_input]:text-sm [&_input]:py-2"
                placeholder="6000"
              />
            </div>
          </div>

          {/* Range Display */}
          <div className="text-center text-sm text-text-secondary bg-gray-50 py-2 rounded">
            ${filterValues.priceRange.min} - ${filterValues.priceRange.max}
          </div>
        </div>
      </FilterSection>

      {/* --- BỘ LỌC RIÊNG CHO FLIGHT --- */}
      {type === 'flight' && (
        <>
          <FilterSection title="Hãng hàng không">
            <Checkbox
              id="airline_emirates"
              label="Emirates"
              checked={isFilterSelected('airlines', 'Emirates')}
              onChange={() => handleFilterChange('airlines', 'Emirates')}
            />
            <Checkbox
              id="airline_flydubai"
              label="Fly Dubai"
              checked={isFilterSelected('airlines', 'Fly Dubai')}
              onChange={() => handleFilterChange('airlines', 'Fly Dubai')}
            />
            <Checkbox
              id="airline_qatar"
              label="Qatar Airways"
              checked={isFilterSelected('airlines', 'Qatar Airways')}
              onChange={() => handleFilterChange('airlines', 'Qatar Airways')}
            />
            <Checkbox
              id="airline_etihad"
              label="Etihad"
              checked={isFilterSelected('airlines', 'Etihad')}
              onChange={() => handleFilterChange('airlines', 'Etihad')}
            />
          </FilterSection>

          <FilterSection title="Thời gian bay">
            <Checkbox
              id="time_morning"
              label="Sáng (05:00 - 11:59)"
              checked={isFilterSelected('departureTime', 'morning')}
              onChange={() => handleFilterChange('departureTime', 'morning')}
            />
            <Checkbox
              id="time_afternoon"
              label="Chiều (12:00 - 17:59)"
              checked={isFilterSelected('departureTime', 'afternoon')}
              onChange={() => handleFilterChange('departureTime', 'afternoon')}
            />
            <Checkbox
              id="time_evening"
              label="Tối (18:00 - 23:59)"
              checked={isFilterSelected('departureTime', 'evening')}
              onChange={() => handleFilterChange('departureTime', 'evening')}
            />
          </FilterSection>
        </>
      )}

      {/* --- BỘ LỌC RIÊNG CHO TOUR --- */}
      {type === 'tour' && (
        <>
          <FilterSection title="Thời lượng">
            <Checkbox
              id="dur_1_3"
              label="1-3 Ngày"
              checked={isFilterSelected('duration', '1-3 ')}
              onChange={() => handleFilterChange('duration', '1-3 ')}
            />
            <Checkbox
              id="dur_4_7"
              label="4-7 Ngày"
              checked={isFilterSelected('duration', '4-7 ')}
              onChange={() => handleFilterChange('duration', '4-7 ')}
            />
            <Checkbox
              id="dur_7_plus"
              label="Trên 7 Ngày"
              checked={isFilterSelected('duration', '7+')}
              onChange={() => handleFilterChange('duration', '7+')}
            />
          </FilterSection>

          <FilterSection title="Điểm đến">
            <Checkbox
              id="dest_hanoi"
              label="Hà Nội"
              checked={isFilterSelected('destination', 'hanoi')}
              onChange={() => handleFilterChange('destination', 'hanoi')}
            />
            <Checkbox
              id="dest_hcm"
              label="Hồ Chí Minh"
              checked={isFilterSelected('destination', 'hochiminh')}
              onChange={() => handleFilterChange('destination', 'hochiminh')}
            />
            <Checkbox
              id="dest_danang"
              label="Đà Nẵng"
              checked={isFilterSelected('destination', 'danang')}
              onChange={() => handleFilterChange('destination', 'danang')}
            />
            <Checkbox
              id="dest_hoian"
              label="Hội An"
              checked={isFilterSelected('destination', 'hoian')}
              onChange={() => handleFilterChange('destination', 'hoian')}
            />
            <Checkbox
              id="dest_nhatrang"
              label="Nha Trang"
              checked={isFilterSelected('destination', 'nhatrang')}
              onChange={() => handleFilterChange('destination', 'nhatrang')}
            />
          </FilterSection>
        </>
      )}

      {/* Show All Results Button */}
      <div className="pt-4 border-t border-border-primary">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            // Navigate to the appropriate listing page to show all results
            if (type === 'flight') {
              navigate('/flight-listing');
            } else {
              navigate('/tour-listing');
            }
          }}
        >
          Hiển thị tất cả kết quả
        </Button>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
