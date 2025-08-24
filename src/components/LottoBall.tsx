import React from 'react';

interface LottoBallProps {
  number: number;
  size?: 'sm' | 'md' | 'lg';
}

const getBallColor = (number: number): string => {
  if (number <= 10) return 'bg-gradient-to-br from-yellow-400 to-yellow-500';
  if (number <= 20) return 'bg-gradient-to-br from-blue-400 to-blue-500';
  if (number <= 30) return 'bg-gradient-to-br from-red-400 to-red-500';
  if (number <= 40) return 'bg-gradient-to-br from-gray-400 to-gray-500';
  return 'bg-gradient-to-br from-green-400 to-green-500';
};

const getSizeClass = (size: 'sm' | 'md' | 'lg'): string => {
  switch (size) {
    case 'sm': return 'w-8 h-8 text-xs';
    case 'lg': return 'w-16 h-16 text-lg';
    default: return 'w-12 h-12 text-sm';
  }
};

const LottoBall: React.FC<LottoBallProps> = ({ number, size = 'md' }) => {
  const colorClass = getBallColor(number);
  const sizeClass = getSizeClass(size);

  return (
    <div className={`${colorClass} ${sizeClass} rounded-full flex items-center justify-center shadow-lg`}>
      <span className="text-white font-bold">
        {number}
      </span>
    </div>
  );
};

export default LottoBall;
