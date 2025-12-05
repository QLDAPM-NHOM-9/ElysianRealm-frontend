import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Checkbox from '../common/Checkbox.jsx';

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

const FiltersSidebar = ({ type = 'flight' }) => {
  return (
    <aside className="w-full lg:w-72 bg-bg-primary p-6 rounded-lg shadow-sm h-fit">
      <h3 className="text-xl font-bold text-text-primary mb-4">Bộ lọc</h3>

      {/* --- BỘ LỌC CHUNG --- */}
      <FilterSection title="Khoảng giá">
        {/* Slider placeholder */}
        <div className="h-2 bg-gray-200 rounded-full relative mt-2 mb-4">
          <div className="absolute left-1/4 right-1/4 top-0 bottom-0 bg-brand-primary rounded-full"></div>
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full cursor-pointer"></div>
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full cursor-pointer"></div>
        </div>
        <div className="flex justify-between text-sm font-medium text-text-primary">
          <span>$50</span>
          <span>$1200</span>
        </div>
      </FilterSection>

      <FilterSection title="Đánh giá">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} className="flex-1 border border-border-primary rounded-lg py-2 text-sm hover:bg-brand-pale hover:border-brand-primary hover:text-brand-primary transition-colors">
              {star}+
            </button>
          ))}
        </div>
      </FilterSection>

      {/* --- BỘ LỌC RIÊNG CHO FLIGHT --- */}
      {type === 'flight' && (
        <>
          <FilterSection title="Hãng hàng không">
            <Checkbox id="airline_emirates" label="Emirates" />
            <Checkbox id="airline_flydubai" label="Fly Dubai" />
            <Checkbox id="airline_qatar" label="Qatar Airways" />
            <Checkbox id="airline_etihad" label="Etihad" />
          </FilterSection>
          
          <FilterSection title="Thời gian bay">
            <Checkbox id="time_morning" label="Sáng (05:00 - 11:59)" />
            <Checkbox id="time_afternoon" label="Chiều (12:00 - 17:59)" />
            <Checkbox id="time_evening" label="Tối (18:00 - 23:59)" />
          </FilterSection>
        </>
      )}

      {/* --- BỘ LỌC RIÊNG CHO TOUR --- */}
      {type === 'tour' && (
        <>
          <FilterSection title="Thời lượng">
            <Checkbox id="dur_1_3" label="1-3 Ngày" />
            <Checkbox id="dur_4_7" label="4-7 Ngày" />
            <Checkbox id="dur_7_plus" label="Trên 7 Ngày" />
          </FilterSection>

          <FilterSection title="Loại hình">
            <Checkbox id="type_nature" label="Khám phá thiên nhiên" />
            <Checkbox id="type_culture" label="Văn hóa & Lịch sử" />
            <Checkbox id="type_relax" label="Nghỉ dưỡng" />
            <Checkbox id="type_adventure" label="Mạo hiểm" />
          </FilterSection>
        </>
      )}
    </aside>
  );
};

export default FiltersSidebar;