import React from 'react';
import { LATEST_LOTTO_DATA } from '@/constants';
import LottoBall from '@/components/LottoBall';

interface MainScreenProps {
  onGenerate: () => void;
  error: string | null;
}

const MainScreen: React.FC<MainScreenProps> = ({ onGenerate, error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* 최신 당첨 번호 섹션 */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            {LATEST_LOTTO_DATA.round}회 ({LATEST_LOTTO_DATA.date})
          </h2>
        </div>
        
        {/* 로또 공 표시 */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {LATEST_LOTTO_DATA.numbers.map((num, index) => (
            <LottoBall key={index} number={num} />
          ))}
          <div className="mx-2 flex items-center">
            <span className="text-gray-500 text-xl">+</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">
              {LATEST_LOTTO_DATA.bonusNumber}
            </span>
          </div>
        </div>
      </div>

      {/* AI 번호 생성 섹션 */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          🤖 AI가 분석한 행운의 번호
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          💡 최근 당첨 데이터 기반으로 생성됩니다.
        </p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}
        
        <button
          onClick={onGenerate}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 shadow-lg"
        >
          🎯 번호 생성하기
        </button>
      </div>

      {/* 광고 공간 */}
      <div className="w-full max-w-md bg-gray-100 rounded-lg p-4 text-center text-gray-500">
        [ Google AdSense Placeholder ]
      </div>
    </div>
  );
};

export default MainScreen;
