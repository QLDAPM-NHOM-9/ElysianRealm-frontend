import React from 'react';

const Checkbox = ({ id, label, className = '', ...props }) => {
  return (
    <label 
      htmlFor={id} 
      className={`flex items-center text-sm text-text-secondary cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        id={id}
        className="mr-2 rounded border-border-primary text-brand-primary focus:ring-brand-primary"
        {...props}
      />
      {label}
    </label>
  );
};

export default Checkbox;

/*
  CÁCH DÙNG:
  <Checkbox id="terms" label="I agree to the terms" />
*/