import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;  // ✅ Agregamos className
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 text-white rounded-lg ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
