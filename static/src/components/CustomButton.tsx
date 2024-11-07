import React from 'react';

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  color?: 'blue' | 'green' | 'red' | 'gray'; // Restrict color values
  size?: 'sm' | 'md' | 'lg'; // Restrict size values
  disabled?: boolean; // Optional disabled prop
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  color = 'blue',
  size = 'md',
  disabled = false,
}) => {
  // TailwindCSS classes for different button variants
  const baseClasses = 'font-semibold text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none';
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-700',
    green: 'bg-green-500 hover:bg-green-700',
    red: 'bg-red-500 hover:bg-red-700',
    gray: 'bg-gray-500 hover:bg-gray-700',
  };
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;

