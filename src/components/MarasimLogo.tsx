import React from 'react';
import logoImg from '../assets/images/regenerated_image_1785415051399.png';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  colorScheme?: 'pink' | 'teal' | 'black' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MarasimIconMark: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-5 h-5",
  color = "currentColor" 
}) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="73" cy="25" r="14" fill={color} />
    <path 
      d="M 5 47 H 32 A 28 28 0 0 1 60 75 V 95 H 5 Z" 
      fill={color} 
    />
  </svg>
);

export const MarasimLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  colorScheme = 'black'
}) => {
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24'
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoImg}
        alt="شعار مراسم"
        className={`${heights} w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none ${
          colorScheme === 'white' ? 'brightness-0 invert' : ''
        }`}
      />
    </div>
  );
};





