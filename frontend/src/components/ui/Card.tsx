import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-4 bg-white shadow-md rounded-2xl ${className}`}>
    {children}
  </div>
);

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => (
  <div className="p-4">
    {children}
  </div>
);

export default Card;
