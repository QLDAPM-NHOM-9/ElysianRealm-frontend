import React from 'react';

const Select = ({ id, label, className = '', selectClassName = '', children, onChange, ...props }) => {
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
      <select
        id={id}
        className={`w-full px-4 py-3 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary ${selectClassName}`}
        onChange={handleChange}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;

/*
  CÁCH DÙNG:
  <Select id="country" label="Country">
    <option>United States</option>
    <option>Vietnam</option>
  </Select>
*/
