import React, { useEffect, useRef } from 'react';
import { Globe, Bot, MessageSquareText, FileSpreadsheet } from 'lucide-react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, color, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (cardRef.current) {
                cardRef.current.style.opacity = '1';
                cardRef.current.style.transform = 'translateY(0)';
              }
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={cardRef}
      className={`bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl card-hover gradient-border opacity-0 transform translate-y-10`}
      style={{ 
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        '--neon-blue': color === 'blue' ? '#0cf' : color === 'purple' ? '#b45afb' : color === 'pink' ? '#ff47d2' : '#0cfa83'
      } as React.CSSProperties}
    >
      <div className={`mb-4 text-[${color === 'blue' ? '#0cf' : color === 'purple' ? '#b45afb' : color === 'pink' ? '#ff47d2' : '#0cfa83'}]`}>
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300 text-sm md:text-base">{description}</p>
    </div>
  );
};

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="w-full py-16 md:py-20 px-4 md:px-12">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
        Benefícios <span className="neon-text-purple">Exclusivos</span>
      </h2>
      
      <p className="text-center text-gray-300 text-base md:text-lg mb-12 max-w-3xl mx-auto px-4">
        Ao contratar nossos serviços, você receberá um pacote completo de soluções digitais para impulsionar seu negócio:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        <BenefitCard 
          icon={<Globe size={36} />} 
          title="Site Profissional" 
          description="Site moderno e responsivo, otimizado para conversão e com design profissional personalizado."
          color="blue"
          delay={0}
        />
        
        <BenefitCard 
          icon={<Bot size={36} />} 
          title="Integração com IA" 
          description="Chatbot inteligente para responder suas perguntas e atender seus clientes 24 horas por dia."
          color="purple"
          delay={200}
        />
        
        <BenefitCard 
          icon={<MessageSquareText size={36} />} 
          title="Automação no WhatsApp" 
          description="Atendimento automático via WhatsApp para captar leads e responder dúvidas sem sua intervenção."
          color="pink"
          delay={400}
        />
        
        <BenefitCard 
          icon={<FileSpreadsheet size={36} />} 
          title="Leads no Google Sheets" 
          description="Todos os contatos são armazenados automaticamente em uma planilha para você acompanhar e gerenciar."
          color="green"
          delay={600}
        />
      </div>
    </section>
  );
};

export default Benefits;