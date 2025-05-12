import React from 'react';

interface SuccessScreenProps {
  wantsAutomation: boolean;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ wantsAutomation }) => {
  return (
    <div className="text-center py-8 animate-fadeIn">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-10 w-10 text-green-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        {wantsAutomation 
          ? "Obrigado! Suas informações foram enviadas com sucesso."
          : "Entendido! Obrigado por compartilhar suas informações."
        }
      </h1>
      
      <p className="text-gray-700 text-lg mb-6">
        {wantsAutomation 
          ? "Em breve, entraremos em contato para ativar tudo! 🛠️"
          : "Vamos preparar seu site com carinho e qualidade 🧡"
        }
      </p>

      {wantsAutomation && (
        <div className="bg-[#FFF4EB] p-6 rounded-xl border border-[#FFE0CC] mb-6 inline-block">
          <h2 className="text-xl font-bold text-[#FF7300] mb-2">
            Parabéns!
          </h2>
          <p className="text-gray-700">
            Você deu o primeiro passo para ter um site com resultado real 💼✨
          </p>
        </div>
      )}
      
      <div className="mt-8">
        <a 
          href="https://geneseez.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#FF7300] hover:text-[#E66800] font-medium transition-colors"
        >
          Conheça mais sobre a Geneseez
        </a>
      </div>
    </div>
  );
};

export default SuccessScreen;