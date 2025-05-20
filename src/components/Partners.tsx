import React, { useEffect, useRef } from 'react';

interface Partner {
  id: number;
  name: string;
  logo: string;
}

interface PartnersProps {
  onContactClick: () => void;
}

const Partners: React.FC<PartnersProps> = ({ onContactClick }) => {
  const partners: Partner[] = [
    {
      id: 1,
      name: "n8n",
      logo: "/n8n.png"
    },
    {
      id: 2,
      name: "Z-API",
      logo: "zapi.png"
    },
    {
      id: 3,
      name: "chat-gpt",
      logo: "chatgpt.png"
    },
    {
      id: 4,
      name: "supabase",
      logo: "supabase.png"
    },
    {
      id: 5,
      name: "slack",
      logo: "slack.png"
    },
    {
      id: 6,
      name: "github",
      logo: "github.png"
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const partnerLogos = partnersRef.current?.querySelectorAll('.partner-logo');
            partnerLogos?.forEach((logo, index) => {
              setTimeout(() => {
                logo.classList.add('opacity-100', 'translate-y-0');
                logo.classList.remove('opacity-0', 'translate-y-10');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="partners" className="py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Tecnológias</h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-center mb-12">
          Trabalhamos com ferramentas e plataformas de tecnológias líderes do mercado para desenvolver automações personalizadas e eficientes para nossos clientes.
        </p>
        
        <div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
          ref={partnersRef}
        >
          {partners.map((partner) => (
            <div 
              key={partner.id}
              className="partner-logo flex items-center justify-center p-4 transition-all duration-500 opacity-0 translate-y-10"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-12 max-w-full grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Saiba Mais</h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Interessado em fazer parte da equipe Geneseez? Estamos sempre procurando expandir nossa equipe.
          </p>
          <button 
            onClick={onContactClick}
            className="bg-black text-white font-medium py-3 px-8 rounded-md hover:bg-gray-800 transition-colors"
          >
            Entre em Contato
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;