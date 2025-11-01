import React from 'react';
import { FiStar } from 'react-icons/fi';

// Component con: Tóm tắt đơn hàng
const OrderSummary = ({ title, subTitle, imageUrl }) => (
  <div className="flex gap-4">
    <img src={imageUrl} alt={title} className="w-28 h-20 rounded-lg object-cover" />
    <div>
      <p className="text-sm text-text-secondary">Economy</p>
      <h4 className="font-bold text-text-primary">{title}</h4>
      <div className="flex items-center gap-2 text-sm mt-1">
        <span className="flex items-center gap-1 text-sm font-medium text-brand-primary">
          4.2 <FiStar className="w-3 h-3 fill-current" />
        </span>
        <span className="text-text-secondary">Very Good (54 reviews)</span>
      </div>
    </div>
  </div>
);

// Component con: Hàng chi tiết giá
const PriceRow = ({ label, value, isLast = false, isTotal = false }) => (
  <div className={`flex justify-between items-center ${isLast ? '' : 'pb-4 mb-4 border-b border-border-primary'}`}>
    <span className={isTotal ? "font-bold text-text-primary" : "text-text-secondary"}>
      {label}
    </span>
    <span className={isTotal ? "font-bold text-text-primary" : "font-medium text-text-primary"}>
      ${value}
    </span>
  </div>
);

const BookingSidebar = ({ orderDetails, priceDetails }) => {
  return (
    <aside className="w-full lg:w-96 bg-bg-primary p-6 rounded-lg shadow-sm sticky top-28">
      {/* Tóm tắt đơn hàng */}
      <OrderSummary 
        title={orderDetails.title}
        subTitle={orderDetails.subTitle}
        imageUrl={orderDetails.imageUrl}
      />
      
      <p className="text-xs text-text-secondary my-4">
        Your booking is protected by <span className="font-bold text-brand-primary">Elysian Realm</span>
      </p>

      {/* Chi tiết giá */}
      <h4 className="text-lg font-bold text-text-primary mb-4">Price Details</h4>
      <div className="space-y-4">
        <PriceRow label="Base Fare" value={priceDetails.base} />
        <PriceRow label="Discount" value={priceDetails.discount} />
        <PriceRow label="Taxes" value={priceDetails.taxes} />
        <PriceRow label="Service Fee" value={priceDetails.serviceFee} />
        <PriceRow label="Total" value={priceDetails.total} isLast={true} isTotal={true} />
      </div>
    </aside>
  );
};

export default BookingSidebar;