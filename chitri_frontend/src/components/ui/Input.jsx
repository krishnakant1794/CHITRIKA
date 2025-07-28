// chitri_frontend/src/components/ui/Input.jsx
import React from 'react';

const Input = ({ label, name, type = 'text', value, onChange, placeholder, required = false, className = '', min, max, step, disabled = false }) => {
  const inputClasses = `w-full px-4 py-2 bg-gray-700 border border-taupe rounded-md focus:outline-none focus:ring-2 focus:ring-taupe text-white ${className}`;

  // Ensure value is always a controlled string, even if initially null/undefined
  const controlledValue = value === null || value === undefined ? '' : value;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-taupe text-sm font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={controlledValue} // Use controlledValue
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${inputClasses} h-24 resize-y`}
          disabled={disabled}
        ></textarea>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={controlledValue} // Use controlledValue
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default Input;
