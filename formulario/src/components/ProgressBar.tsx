import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-gray-200">
      <div 
        className="h-full bg-[#FF7300] transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;