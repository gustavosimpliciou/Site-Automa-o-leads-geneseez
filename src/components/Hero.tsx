import React, { useEffect, useRef } from 'react';
import ParticleAnimation from './ParticleAnimation';

const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headlineRef.current) observer.observe(headlineRef.current);
    if (subheadlineRef.current) observer.observe(subheadlineRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      if (headlineRef.current) observer.unobserve(headlineRef.current);
      if (subheadlineRef.current) observer.unobserve(subheadlineRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="interactive-particle relative min-h-screen flex items-center justify-center pt-24 pb-16"
    >
      {/* Background com padrão geométrico */}
      <div className="absolute inset-0 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array(64).fill(null).map((_, i) => (
              <div 
                key={i}
                className={`
                  border border-gray-700 
                  ${Math.random() > 0.7 ? 'bg-gray-800' : ''}
                  ${Math.random() > 0.9 ? 'bg-gray-700' : ''}
                `} 
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90" />
      </div>

      {/* Animação de partículas */}
      <ParticleAnimation />

      <div className="container mx-auto px-4 z-20 text-center">
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 opacity-0 translate-y-10"
        >
          Transforme Sua Empresa com Automação Genessez
        </h1>
        <p 
          ref={subheadlineRef}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-300 opacity-0 translate-y-10"
        >
          Utilizando o poder do n8n para entregar automação de processos perfeita e experiências excepcionais aos clientes.
        </p>
        <div 
          ref={ctaRef}
          className="transition-all duration-1000 delay-500 opacity-0 translate-y-10"
        >
          <button 
            onClick={scrollToContact}
            className="bg-white text-black font-medium py-3 px-8 rounded-md hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105"
          >
            Solicitar Demonstração
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;