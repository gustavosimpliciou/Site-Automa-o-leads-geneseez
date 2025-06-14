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
      className="interactive-particle relative h-screen flex items-center justify-center pt-24 pb-16"
    >
      {/* Clean white background with subtle pattern */}
      <div className="absolute inset-0 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array(144).fill(null).map((_, i) => (
              <div 
                key={i}
                className={`
                  border border-gray-100 
                  ${Math.random() > 0.85 ? 'bg-gray-50' : ''}
                `} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle particle animation */}
      <ParticleAnimation isDark={true} />

      {/* Center area for cristo.png image */}
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 z-20 h-full flex items-center justify-center">
        <div 
          ref={sectionRef}
          className="transition-all duration-1000 opacity-0 translate-y-10 flex items-center justify-center w-full h-full max-h-[calc(100vh-12rem)]"
        >
          {/* Cristo image container - perfectly sized for single section */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto flex items-center justify-center">
            <img 
              src="/cristo.png" 
              alt="Cristo" 
              className="w-full h-auto max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh] lg:max-h-[75vh] object-contain"
              style={{
                filter: 'none',
                boxShadow: 'none',
                border: 'none',
                outline: 'none'
              }}
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
            <div className="fallback w-full max-w-xs sm:max-w-sm md:max-w-md h-64 sm:h-80 md:h-96 bg-transparent border-2 border-dashed border-gray-200 rounded-lg items-center justify-center hidden">
              <p className="text-gray-300 text-sm sm:text-base md:text-lg text-center px-4">Cristo.png será exibido aqui</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origem;