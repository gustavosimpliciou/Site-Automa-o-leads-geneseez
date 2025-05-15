import React from 'react';
import { Check, Zap } from 'lucide-react';

interface PricingProps {
  onCtaClick: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onCtaClick }) => {
  return (
    <section id="pricing" className="w-full py-20 px-6 md:px-12 bg-slate-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0cf]/10 rounded-full mb-6">
          <Zap className="text-[#0cf]" size={20} />
          <span className="text-[#0cf] font-semibold">Oferta de Lançamento</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Pacote completo com <span className="neon-text-purple text-5xl">30% OFF</span>
        </h2>
        <p className="text-gray-300 text-lg mb-2">
          Para os 5 primeiros clientes
        </p>

        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl gradient-border mt-12">
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-6xl font-bold bg-gradient-to-r from-[#0cf] to-[#0cfa83] text-transparent bg-clip-text">R$ 497</span>
              <span className="text-gray-400">à vista</span>
            </div>
            <p className="text-2xl font-semibold neon-text-blue mb-6">ou 2x de R$ 250</p>

            <ul className="space-y-4 text-left mb-8">
              <li className="flex items-center gap-3">
                <Check className="text-[#0cfa83]" />
                <span>Site profissional personalizado</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-[#0cfa83]" />
                <span>Chatbot com IA integrado</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-[#0cfa83]" />
                <span>Automação completa do WhatsApp</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-[#0cfa83]" />
                <span>Sistema de captura de leads</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-[#0cfa83]" />
                <span>Integração com Google Sheets</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-[#0cfa83]" />
                <span>Suporte técnico por 30 dias</span>
              </li>
            </ul>

            <button
              onClick={onCtaClick}
              className="w-full py-4 px-8 bg-gradient-to-r from-[#0cf] to-[#0cfa83] rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-[#0cf]/20 transition-all duration-300"
            >
              ADQUIRA SEU SITE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;