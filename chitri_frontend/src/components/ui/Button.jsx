// chitri_frontend/src/components/ui/Button.jsx
import React from 'react';
import { Loader2 } from 'lucide-react'; // Example spinner icon

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary, secondary, danger, outline
  size = 'md', // sm, md, lg
  className = '',
  disabled = false,
  loading = false,
}) => {
  const baseStyles = 'font-semibold rounded-md transition duration-300 ease-in-out flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-taupe text-black hover:bg-deep-taupe hover:text-white shadow-md hover:shadow-lg transform hover:scale-105',
    secondary: 'bg-gray-700 text-gray-light hover:bg-gray-600 hover:text-white border border-taupe',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md',
    outline: 'border border-taupe text-taupe hover:bg-taupe hover:text-black',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${
        (disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled || loading}
    >
      {loading && <Loader2 className="animate-spin mr-2 h-5 w-5" />}
      {children}
    </button>
  );
};

export default Button;
