import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Input Component
const Input = ({ 
  icon: Icon, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  className = "",
  name 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  const handleChange = (e) => {
    if (onChange) {
      if (name) {
        // For controlled components with name attribute
        onChange({
          target: {
            name: name,
            value: e.target.value
          }
        });
      } else {
        // For simple onChange handlers
        onChange(e);
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        className={`block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;