import React, { useEffect, useRef } from 'react';
import ParticleAnimation from './ParticleAnimation';

const Origem: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section 
      id="origem" 
      className="interactive-particle relative min-h-screen flex items-center justify-center pt-24 pb-16"
    >
      {/* White background with light gray square pattern */}
      <div className="absolute inset-0 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array(64).fill(null).map((_, i) => (
              <div 
                key={i}
                className={`
                  border border-gray-200 
                  ${Math.random() > 0.7 ? 'bg-gray-100' : ''}
                  ${Math.random() > 0.9 ? 'bg-gray-200' : ''}
                `} 
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/60" />
      </div>

      {/* Black particle animation */}
      <ParticleAnimation isDark={true} />

      {/* Center area for cristo.png image */}
      <div className="container mx-auto px-4 z-20">
        <div 
          ref={sectionRef}
          className="transition-all duration-1000 opacity-0 translate-y-10 flex items-center justify-center min-h-[60vh]"
        >
          {/* Cristo image container */}
          <div className="w-full max-w-4xl h-96 flex items-center justify-center">
            <img 
              src="/cristo.png" 
              alt="Cristo" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              onError={(e) => {
                // Fallback if image doesn't exist
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.parentElement?.querySelector('.fallback');
                if (fallback) {
                  (fallback as HTMLElement).style.display = 'flex';
                }
              }}
            />
            {/* Fallback placeholder */}
            <div className="fallback w-full h-full bg-transparent border-2 border-dashed border-gray-300 rounded-lg items-center justify-center hidden">
              <p className="text-gray-400 text-lg">Cristo.png será exibido aqui</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origem;