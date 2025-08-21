import React, { useRef, useEffect, useCallback } from 'react';
import { toPng } from 'html-to-image';
import QRious from 'qrious';
import { LottoResult } from '@/types';
import LottoBall from '@/components/LottoBall';

interface ResultScreenProps {
  result: LottoResult;
  onRegenerate: () => void;
  onBack: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRegenerate, onBack }) => {
  const resultCardRef = useRef<HTMLDivElement>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleSaveImage = useCallback(() => {
    if (resultCardRef.current === null) {
      return;
    }
    toPng(resultCardRef.current, { cacheBust: true, backgroundColor: '#ffffff' })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `lucky-lotto-numbers-${result.numbers.join('-')}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
      });
  }, [result.numbers]);
  
  useEffect(() => {
    if (qrCanvasRef.current) {
        const numbersString = result.numbers.join(',');
        new QRious({
            element: qrCanvasRef.current,
            value: numbersString,
            size: 200,
            padding: 10,
        });
    }
  }, [result.numbers]);

  return (
    <div className="flex flex-col items-center w-full space-y-6 animate-fade-in">
      <button onClick={onBack} className="self-start text-primary-blue hover:underline">
        &larr; 뒤로가기
      </button>

      <h2 className="text-2xl font-bold">🎉 AI 추천 번호 완성!</h2>

      <div ref={resultCardRef} className="bg-white p-5 rounded-2xl shadow-lg w-full">
        <div className="flex justify-around items-center mb-4">
          {result.numbers.map((num) => (
            <LottoBall key={num} number={num} />
          ))}
        </div>
        <p className="bg-light-gray text-dark-gray p-3 rounded-lg text-center font-semibold">
           📊 {result.analysis}
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-lg w-full flex flex-col items-center">
        <h3 className="text-lg font-bold mb-2">📱 QR코드로 저장</h3>
        <canvas ref={qrCanvasRef} className="rounded-lg"></canvas>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <button
          onClick={onRegenerate}
          className="h-14 bg-gray-200 text-dark-gray text-lg font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          🔄 다시 생성
        </button>
        <button
          onClick={handleSaveImage}
          className="h-14 bg-primary-blue text-white text-lg font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          📥 이미지 저장
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;