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
      <div className="container mx-auto px-4 z-20">
        <div 
          ref={sectionRef}
          className="transition-all duration-1000 opacity-0 translate-y-10 flex items-center justify-center min-h-[70vh]"
        >
          {/* Cristo image container - seamlessly integrated */}
          <div className="w-full max-w-5xl h-auto flex items-center justify-center">
            <img 
              src="/cristo.png" 
              alt="Cristo" 
              className="max-w-full h-auto object-contain filter drop-shadow-none"
              style={{
                filter: 'none',
                boxShadow: 'none'
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
            <div className="fallback w-full max-w-md h-96 bg-transparent border-2 border-dashed border-gray-200 rounded-lg items-center justify-center hidden">
              <p className="text-gray-300 text-lg text-center px-4">Cristo.png será exibido aqui</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origem;