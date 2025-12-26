import React from 'react';

const Input = ({ id, label, icon, iconRight, className = '', onChange, ...props }) => {
  // Xác định xem có cần thêm padding cho icon không
  const hasIconLeft = !!icon;
  const hasIconRight = !!iconRight;

  // Handle onChange to pass value instead of event
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          className="block text-sm font-medium text-text-primary mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {/* Icon bên trái */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-tertiary">
            {React.cloneElement(icon, { className: 'w-5 h-5' })}
          </div>
        )}

        <input
          id={id}
          className={`w-full px-4 py-3 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary
            ${hasIconLeft ? 'pl-11' : ''}
            ${hasIconRight ? 'pr-11' : ''}
          `}
          onChange={handleChange}
          {...props}
        />

        {/* Icon bên phải (thường là nút, nên có pointer-events) */}
        {iconRight && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-tertiary">
            {iconRight}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
