import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Checkbox from '../common/Checkbox.jsx'; // <-- IMPORT
  

// Component con: 1 mục filter (có thể thu gọn)
const FilterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-border-primary py-4">
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

const FiltersSidebar = () => {
  return (
    <aside className="w-full lg:w-72 bg-bg-primary p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-text-primary mb-4">Filters</h3>

      {/* Price Filter */}
      <FilterSection title="Price">
        {/* (Thanh trượt giá (Slider) sẽ cần 1 thư viện ngoài như 'rc-slider') */}
        <p className="text-sm text-text-secondary">Slider placeholder</p>
        <div className="flex justify-between text-sm">
          <span>$70</span>
          <span>$280</span>
        </div>
      </FilterSection>

      {/* Departure Time Filter */}
      <FilterSection title="Departure Time">
        <p className="text-sm text-text-secondary">Slider placeholder</p>
        <div className="flex justify-between text-sm">
          <span>10:04am</span>
          <span>11:54pm</span>
        </div>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection title="Rating">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((star) => (
            <button key={star} className="flex-1 border border-border-primary rounded-lg py-2 text-sm hover:bg-brand-pale">
              {star}+
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Airlines Filter (ĐÃ REFACTOR) */}
      <FilterSection title="Airlines">
        <Checkbox id="filterEmirated" label="Emirated" />
        <Checkbox id="filterFlyDubai" label="Fly Dubai" />
        <Checkbox id="filterQatar" label="Qatar" />
        <Checkbox id="filterEtihad" label="Etihad" />
      </FilterSection>
      
      {/* Trips Filter (ĐÃ REFACTOR) */}
      <FilterSection title="Trips">
        <Checkbox id="filterRoundTrip" label="Round Trip" />
        <Checkbox id="filterOneWay" label="One Way" />
        <Checkbox id="filterMultiCity" label="Multi-City" />
        <Checkbox id="filterFlexible" label="My Dates Are Flexible" />
      </FilterSection>
    </aside>
  );
};

export default FiltersSidebar;