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
      className="interactive-particle relative h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
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

      {/* Cristo image - centered */}
      <div 
        ref={sectionRef}
        className="z-20 transition-all duration-1000 opacity-0 translate-y-10 flex items-center justify-center"
      >
        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto flex items-center justify-center">
          <img 
            src="/cristo.png" 
            alt="Cristo" 
            className="w-full h-auto max-h-[55vh] sm:max-h-[60vh] md:max-h-[65vh] lg:max-h-[70vh] object-contain"
            style={{
              filter: 'none',
              boxShadow: 'none',
              border: 'none',
              outline: 'none'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Spinning Disco image - positioned at right edge, partially off-screen */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 z-10">
        <img 
          src="/disco.png" 
          alt="Disco" 
          className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain animate-spin-slow"
          style={{
            filter: 'none',
            boxShadow: 'none',
            border: 'none',
            outline: 'none'
          }}
        />
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Origem;
