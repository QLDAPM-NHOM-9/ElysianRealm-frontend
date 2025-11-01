import React from 'react';

const Radio = ({ id, label, name, className = '', ...props }) => {
  return (
    <label 
      htmlFor={id} 
      className={`flex items-center text-sm text-text-secondary cursor-pointer ${className}`}
    >
      <input
        type="radio"
        id={id}
        name={name}
        className="mr-2 border-border-primary text-brand-primary focus:ring-brand-primary"
        {...props}
      />
      {label}
    </label>
  );
};

export default Radio;