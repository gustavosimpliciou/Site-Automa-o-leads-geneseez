import React, { useEffect, useRef } from 'react';
import { Bot, Zap, ArrowRight } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Simple fade-in animation for elements
    const elements = [titleRef.current, subtitleRef.current, ctaRef.current];
    
    elements.forEach((el, index) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
      }
    });
  }, []);

  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-12 pt-16 pb-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#0cf]/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#b45afb]/20 rounded-full blur-[120px] -z-10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 animate-float opacity-20">
        <Bot size={48} className="text-[#0cf]" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <Zap size={48} className="text-[#ff47d2]" />
      </div>
      
      {/* Main content */}
      <h1 
        ref={titleRef}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl mb-6"
      >
        🚀 Ganhe um Site Grátis com <span className="neon-text-blue">IA</span> + <span className="neon-text-green">WhatsApp</span>
      </h1>
      
      <p 
        ref={subtitleRef}
        className="text-xl md:text-2xl text-center text-gray-300 max-w-2xl mb-12"
      >
        Crie sua presença digital com inteligência artificial e automação completa
      </p>
      
      <button 
        ref={ctaRef}
        onClick={onCtaClick}
        className="cta-button group flex items-center shine-effect"
      >
        QUERO MEU SITE GRÁTIS
        <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
      </button>
    </section>
  );
};

export default Hero;