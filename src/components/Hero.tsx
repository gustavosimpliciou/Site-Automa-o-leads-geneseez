import { useEffect, useRef, useState } from 'react';
import Countdown from './Countdown';

interface HeroProps {
  onProjectsClick: () => void;
}

const PHRASES = ['FREQUÊNCIA UNICA', 'ÊXTASE 999', 'ARTE É O CAMINHO'];
const PHRASE_DURATION = 9000;

const Hero: React.FC<HeroProps> = ({ onProjectsClick }) => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        setIsAnimating(false);
      }, 500);
    }, PHRASE_DURATION);

    return () => clearInterval(interval);
  }, []);

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
    if (countdownRef.current) observer.observe(countdownRef.current);

    return () => {
      if (headlineRef.current) observer.unobserve(headlineRef.current);
      if (subheadlineRef.current) observer.unobserve(subheadlineRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
      if (countdownRef.current) observer.unobserve(countdownRef.current);
    };
  }, []);

  return (
    <section 
      id="home" 
      className="interactive-particle relative min-h-screen flex items-center justify-center pt-24 pb-16"
    >
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

      <div className="container mx-auto px-4 z-20 text-center">
        <p 
          className="text-sm md:text-base text-gray-400 uppercase tracking-[0.3em] mb-4 transition-all duration-1000 opacity-0 translate-y-10"
          ref={subheadlineRef}
          style={{ transitionDelay: '100ms' }}
        >
          GENESEEZ ONDE TUDO COMEÇA
        </p>
        <h1 
          ref={headlineRef}
          className={`text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 transition-all duration-500 uppercase ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {PHRASES[currentPhraseIndex]}
        </h1>
        <div 
          ref={ctaRef}
          className="transition-all duration-1000 delay-300 opacity-0 translate-y-10 flex flex-col sm:flex-row gap-4 justify-center items-center mt-6"
        >
          <button 
            onClick={onProjectsClick}
            className="bg-white text-black font-medium py-3 px-8 rounded-md hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105 uppercase"
          >
            VISÃO DO ALBUM
          </button>
          <span className="text-gray-500 text-sm uppercase">NOVO LANÇAMENTO: ÊXTASE 999</span>
        </div>
        <div 
          ref={countdownRef}
          className="transition-all duration-1000 delay-500 opacity-0 translate-y-10"
        >
          <Countdown isHome={true} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
