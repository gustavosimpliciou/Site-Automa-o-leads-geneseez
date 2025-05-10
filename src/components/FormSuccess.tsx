import React from 'react';
import { CheckCircle } from 'lucide-react';

const FormSuccess: React.FC = () => {
  return (
    <div className="text-center py-6">
      <div className="flex justify-center mb-6 text-[#0cfa83]">
        <CheckCircle size={80} />
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Recebemos seus dados!</h2>
      
      <p className="text-gray-300 mb-6">
        Em breve você receberá um e-mail e uma mensagem no WhatsApp com as próximas instruções.
      </p>
      
      <div className="p-4 rounded-lg bg-slate-700/50 text-left">
        <h3 className="font-semibold mb-2 text-[#0cf]">O que acontece agora?</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-[#0cf] mr-2">1.</span>
            <span>Nosso sistema registrou seus dados.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#0cf] mr-2">2.</span>
            <span>Você receberá um e-mail de confirmação em instantes.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#0cf] mr-2">3.</span>
            <span>Uma mensagem WhatsApp será enviada com os próximos passos.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FormSuccess;