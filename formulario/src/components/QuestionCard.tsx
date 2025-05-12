import React from 'react';

interface QuestionCardProps {
  children: React.ReactNode;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ children }) => {
  return (
    <div 
      className="animate-fadeIn"
      style={{
        animation: 'fadeIn 0.5s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default QuestionCard;