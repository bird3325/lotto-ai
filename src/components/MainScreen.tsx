import React from 'react';
import { LATEST_WINNING_NUMBERS } from '@/constants';

interface MainScreenProps {
  onGenerate: () => void;
  error: string | null;
}

const MainScreen: React.FC<MainScreenProps> = ({ onGenerate, error }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in">
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <p className="text-sm text-gray-600">📈 최신 당첨 번호</p>
        <p className="text-xl font-bold tracking-widest">{LATEST_WINNING_NUMBERS.join(' - ')}</p>
      </div>

      <div className="w-full flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">🤖 AI가 분석한 행운의 번호</h2>
        <p className="text-gray-500">💡 최근 당첨 데이터 기반으로 생성됩니다.</p>
        
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
        
        <button
          onClick={onGenerate}
          className="w-full h-[56px] bg-lucky-gold text-dark-gray text-lg font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          🎯 번호 생성하기
        </button>
      </div>

      <div className="w-full bg-gray-200 h-24 flex items-center justify-center text-gray-500 rounded-lg">
        [ Google AdSense Placeholder ]
      </div>
    </div>
  );
};

export default MainScreen;