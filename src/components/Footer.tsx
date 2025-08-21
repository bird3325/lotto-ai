import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-dark-gray py-6 text-center text-sm border-t border-gray-200">
      <div className="container mx-auto px-4">
        <p className="font-bold mb-2">⚠️ 로또는 확률게임이며, AI 번호 생성은 당첨을 보장하지 않습니다.</p>
        <div className="space-x-4">
          <a href="#" className="text-primary-blue hover:underline">이용약관</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="text-primary-blue hover:underline">개인정보처리방침</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
