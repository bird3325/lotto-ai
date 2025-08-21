import React, { useState, useCallback } from 'react';
import { AppState, LottoResult } from '@/types';
import { generateLottoNumbers } from '@/services/geminiService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MainScreen from '@/components/MainScreen';
import LoadingScreen from '@/components/LoadingScreen';
import ResultScreen from '@/components/ResultScreen';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.MAIN);
  const [lottoResult, setLottoResult] = useState<LottoResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const result = await generateLottoNumbers();
      setLottoResult(result);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError('번호 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
      setAppState(AppState.MAIN);
    }
  }, []);

  const handleReset = useCallback(() => {
    setLottoResult(null);
    setError(null);
    setAppState(AppState.MAIN);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.LOADING:
        return <LoadingScreen />;
      case AppState.RESULT:
        return lottoResult ? (
          <ResultScreen
            result={lottoResult}
            onRegenerate={handleGenerate}
            onBack={handleReset}
          />
        ) : null;
      case AppState.MAIN:
      default:
        return <MainScreen onGenerate={handleGenerate} error={error} />;
    }
  };

  return (
    <div className="bg-light-gray min-h-screen flex flex-col font-sans text-dark-gray">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md text-center">
            {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;