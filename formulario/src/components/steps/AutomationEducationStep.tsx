import React, { useState } from 'react';
import QuestionCard from '../QuestionCard';
import NavigationButton from '../NavigationButton';
import { FormData } from '../../types/form';

interface AutomationEducationStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: boolean | null) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const AutomationEducationStep: React.FC<AutomationEducationStepProps> = ({
  formData,
  updateFormData,
  onBack,
  onSubmit
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAutomationChoice = (wantsAutomation: boolean) => {
    updateFormData('wantsAutomation', wantsAutomation);
    
    if (!wantsAutomation) {
      setShowConfirmation(true);
    } else {
      onSubmit();
    }
  };

  const handleFinalChoice = (confirmNoAutomation: boolean) => {
    updateFormData('confirmNoAutomation', confirmNoAutomation);
    
    if (!confirmNoAutomation) {
      updateFormData('wantsAutomation', true);
    }
    
    onSubmit();
  };

  const handleBack = () => {
    if (showConfirmation) {
      setShowConfirmation(false);
      updateFormData('wantsAutomation', null);
    } else {
      onBack();
    }
  };

  if (showConfirmation) {
    return (
      <QuestionCard>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Tem certeza que deseja continuar sem automação?
          </h2>
          <p className="text-gray-700 mb-4">
            Sem essa integração, seu site não salva contatos, não responde clientes, nem direciona para o WhatsApp.
            <br /><br />
            Ele pode até ficar bonito… mas dificilmente vai trazer resultados reais.
          </p>
          <p className="text-gray-700 italic">
            Mas a escolha é sua 😉
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={() => handleFinalChoice(false)}
            className="px-6 py-3 bg-[#FF7300] text-white rounded-lg font-medium transition-all 
              hover:bg-[#E66800] focus:outline-none focus:ring-2 focus:ring-[#FF7300] focus:ring-offset-2"
          >
            Quero ativar a automação agora
          </button>
          <button
            onClick={() => handleFinalChoice(true)}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium transition-all 
              hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Sim, desejo seguir sem automação
          </button>
        </div>

        <div className="mt-8">
          <NavigationButton 
            type="back" 
            onClick={handleBack}
          >
            Voltar
          </NavigationButton>
        </div>
      </QuestionCard>
    );
  }

  return (
    <QuestionCard>
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Seu site está quase pronto! 🚀
        </h1>
        <p className="text-gray-700 text-lg mb-4">
          Mas antes de finalizar, tem algo importante...
        </p>
      </div>

      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          A automação é o que transforma seu site em uma <span className="text-[#FF7300]">máquina de conversão real</span>:
        </h2>
        
        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✅</span>
            <span>Responde seus clientes automaticamente pelo WhatsApp</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✅</span>
            <span>Capta leads e salva os contatos pra você</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✅</span>
            <span>Garante atendimento 24h, mesmo quando você não pode responder</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✅</span>
            <span>Conecta o site direto com quem tá pronto pra comprar</span>
          </li>
        </ul>

        <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg border-l-4 border-[#FF7300]">
          <span className="text-gray-700">🔧</span>
          <p className="text-gray-700">
            Sem essa engrenagem, o site fica bonito, mas não vende. Ele vira um cartão digital parado.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Comparativo de Mercado
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">Mercado</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Site Profissional: R$ 2.000 - 5.000</li>
              <li>Automação: R$ 1.500 - 3.000</li>
              <li>Integração WhatsApp: R$ 500 - 1.000</li>
              <li>Suporte Mensal: R$ 300 - 500</li>
              <li className="font-semibold pt-2 border-t">
                Total: R$ 4.300 - 9.500
              </li>
            </ul>
          </div>
          <div className="p-4 bg-[#FFF4EB] rounded-lg border-2 border-[#FF7300]">
            <h4 className="font-semibold text-[#FF7300] mb-2">Nossa Oferta</h4>
            <div className="space-y-2 text-gray-700">
              <p className="text-3xl font-bold text-[#FF7300]">R$ 597,00</p>
              <p className="text-sm">Pacote completo incluindo:</p>
              <ul className="space-y-1 text-sm">
                <li>✓ Site Profissional</li>
                <li>✓ Automação n8n</li>
                <li>✓ Integração WhatsApp</li>
                <li>✓ Suporte Técnico</li>
              </ul>
              <p className="text-xs mt-2 text-gray-600">
                Economia de até R$ 8.903,00
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Você quer ativar a automação agora e ter um site que realmente trabalha por você?
        </h3>
      </div>

      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <button
          onClick={() => handleAutomationChoice(true)}
          className="px-6 py-3 bg-[#FF7300] text-white rounded-lg font-medium transition-all 
            hover:bg-[#E66800] focus:outline-none focus:ring-2 focus:ring-[#FF7300] focus:ring-offset-2"
        >
          Sim, quero a automação 🚀
        </button>
        <button
          onClick={() => handleAutomationChoice(false)}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium transition-all 
            hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Não, quero apenas o site
        </button>
      </div>

      <div className="mt-8">
        <NavigationButton 
          type="back" 
          onClick={handleBack}
        >
          Voltar
        </NavigationButton>
      </div>
    </QuestionCard>
  );
};

export default AutomationEducationStep;