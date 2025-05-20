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
      logo: "https://n8n.io/images/n8n-logo.svg"
    },
    {
      id: 2,
      name: "Parceiro 1",
      logo: "https://via.placeholder.com/150x50/FFFFFF/000000?text=Parceiro+1"
    },
    {
      id: 3,
      name: "Parceiro 2",
      logo: "https://via.placeholder.com/150x50/FFFFFF/000000?text=Parceiro+2"
    },
    {
      id: 4,
      name: "Parceiro 3",
      logo: "https://via.placeholder.com/150x50/FFFFFF/000000?text=Parceiro+3"
    },
    {
      id: 5,
      name: "Parceiro 4",
      logo: "https://via.placeholder.com/150x50/FFFFFF/000000?text=Parceiro+4"
    },
    {
      id: 6,
      name: "Parceiro 5",
      logo: "https://via.placeholder.com/150x50/FFFFFF/000000?text=Parceiro+5"
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Nossos Parceiros</h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-center mb-12">
          Trabalhamos com parceiros tecnológicos líderes do setor para entregar as melhores soluções de automação para nossos clientes.
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
          <h3 className="text-2xl font-bold mb-4">Seja um Parceiro</h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Interessado em fazer parceria com a Geneseez? Estamos sempre procurando expandir nossa rede de parceiros tecnológicos.
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