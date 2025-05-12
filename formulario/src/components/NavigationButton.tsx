import React from 'react';

interface NavigationButtonProps {
  type: 'next' | 'back' | 'submit';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ 
  type, 
  onClick, 
  disabled = false, 
  children 
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const typeClasses = {
    next: 'bg-[#FF7300] text-white hover:bg-[#E66800] focus:ring-[#FF7300]',
    back: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400',
    submit: 'bg-[#FF7300] text-white hover:bg-[#E66800] focus:ring-[#FF7300]'
  };
  
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${baseClasses} ${typeClasses[type]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default NavigationButton;