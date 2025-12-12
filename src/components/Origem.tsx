import React, { useEffect, useRef } from 'react';
import ParticleAnimation from './ParticleAnimation';
import { Instagram } from 'lucide-react';

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

      {/* Dicipulos image - centered */}
      <div 
        ref={sectionRef}
        className="z-20 transition-all duration-1000 opacity-0 translate-y-10 flex flex-col items-center justify-center"
      >
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto flex items-center justify-center">
          <img 
            src="/dicipulos.png" 
            alt="Dicipulos" 
            className="w-full h-auto max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[65vh] object-contain"
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

        {/* Instagram links for artists */}
        <div className="flex items-center gap-8 mt-6">
          <a 
            href="https://instagram.com/diviinu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-all duration-300 group"
          >
            <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">DIVIINU</span>
          </a>
          <a 
            href="https://instagram.com/lopz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-all duration-300 group"
          >
            <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">LOPZ</span>
          </a>
        </div>
      </div>

      {/* Spinning Disco image - bottom right on mobile/tablet, right center on desktop */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-1/3 z-10">
        <img 
          src="/disco.png" 
          alt="Disco" 
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain animate-spin-slow"
          style={{
            filter: 'none',
            boxShadow: 'none',
            border: 'none',
            outline: 'none'
          }}
        />
      </div>

      {/* Spotify button - bottom left */}
      <a 
        href="#" 
        className="absolute bottom-8 left-8 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-gray-400 transition-all duration-300 hover:border-[#1DB954] hover:text-[#1DB954] hover:bg-[#1DB954]/10 group"
      >
        <svg 
          className="w-5 h-5 transition-colors duration-300 group-hover:text-[#1DB954]" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <span className="text-sm font-medium tracking-wide">Spotify</span>
      </a>

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
