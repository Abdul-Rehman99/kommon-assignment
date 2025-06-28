import React from 'react';

// Button Component
const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  disabled = false, 
  loading = false, 
  variant = "primary", 
  className = "" 
}) => {
  const baseClasses = "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:bg-gray-100",
    danger: "bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
      )}
      {children}
    </button>
  );
};

export default Button;