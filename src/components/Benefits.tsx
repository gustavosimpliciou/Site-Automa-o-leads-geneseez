import React, { useEffect, useRef } from 'react';
import { Zap, TrendingUp, Users, Settings } from 'lucide-react';

interface BenefitProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const BenefitCard: React.FC<BenefitProps> = ({ title, description, icon, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              entry.target.classList.remove('opacity-0', 'translate-y-10');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [delay]);

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md transition-all duration-700 opacity-0 translate-y-10"
      ref={cardRef}
    >
      <div className="text-black mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

const Benefits: React.FC = () => {
  const benefits = [
    {
      title: "Processos Otimizados",
      description: "Automatize tarefas repetitivas e otimize seus processos empresariais com fluxos de trabalho alimentados por n8n.",
      icon: <Zap size={32} />,
      delay: 0
    },
    {
      title: "Soluções Escaláveis",
      description: "Nossas soluções de automação crescem com seu negócio, adaptando-se às suas necessidades e requisitos em constante mudança.",
      icon: <TrendingUp size={32} />,
      delay: 100
    },
    {
      title: "Experiência Aprimorada",
      description: "Melhore a satisfação do cliente através de um atendimento mais rápido, eficiente e interações personalizadas.",
      icon: <Users size={32} />,
      delay: 200
    },
    {
      title: "Suporte Especializado",
      description: "Receba suporte dedicado de nossa equipe de especialistas em automação, garantindo integração perfeita e desempenho ideal.",
      icon: <Settings size={32} />,
      delay: 300
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Por que Escolher a Genessez?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              delay={benefit.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;