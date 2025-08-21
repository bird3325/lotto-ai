import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center animate-fade-in">
      <h2 className="text-2xl font-bold text-primary-blue">🤖 AI 분석 중...</h2>
      <p className="text-gray-600">⏳ 잠시만 기다려주세요, 행운을 불러오고 있습니다!</p>
      <div className="flex space-x-2 text-4xl">
        <div className="animate-bounce [animation-delay:-0.3s]">🎲</div>
        <div className="animate-bounce [animation-delay:-0.15s]">🎲</div>
        <div className="animate-bounce">🎲</div>
        <div className="animate-bounce [animation-delay:-0.3s]">🎲</div>
        <div className="animate-bounce [animation-delay:-0.15s]">🎲</div>
        <div className="animate-bounce">🎲</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
