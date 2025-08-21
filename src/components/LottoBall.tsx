import React from 'react';

interface LottoBallProps {
  number: number;
}

const getBallColor = (number: number): string => {
  if (number <= 10) return 'bg-yellow-400';
  if (number <= 20) return 'bg-blue-400';
  if (number <= 30) return 'bg-red-400';
  if (number <= 40) return 'bg-gray-400';
  return 'bg-green-400';
};

const LottoBall: React.FC<LottoBallProps> = ({ number }) => {
  const colorClass = getBallColor(number);
  
  return (
    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-inner ${colorClass}`}>
      {number}
    </div>
  );
};

export default LottoBall;
