import React, { useEffect, useRef, useState } from 'react';
import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import ParticleAnimation from './ParticleAnimation';

const Origem: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [discoLoaded, setDiscoLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartXRef = useRef<number>(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const carouselImages = [
    { src: '/diivinu1.png', artist: 'diivinu', instagram: 'https://www.instagram.com/diivinu/' },
    { src: '/lopz1.png', artist: 'lopz', instagram: 'https://instagram.com/lopz.of' },
    { src: '/tv1.png', artist: 'tv1', instagram: 'https://instagram.com/lopz.of' },
    { src: '/denys.png', artist: 'denys', instagram: 'https://instagram.com/denys' },
    { src: '/dicipulos.png', artist: 'dicipulos', instagram: 'https://instagram.com/lopz.of' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  useEffect(() => {
    setImageLoaded(false);
  }, [currentImageIndex]);

  const handleMouseEnter = () => {
    hoverTimerRef.current = setTimeout(() => {
      nextImage();
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setSwipeDirection(null);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    const minSwipeDistance = 30;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        setSwipeDirection('left');
        nextImage();
      } else {
        setSwipeDirection('right');
        prevImage();
      }
      setTimeout(() => setSwipeDirection(null), 300);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section 
      id="origem" 
      className="relative h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
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
        <ParticleAnimation isDark={true} containerMode={true} />
      </div>

      <div 
        ref={sectionRef}
        className="z-20 transition-all duration-1000 opacity-0 translate-y-10 flex flex-col items-center justify-center"
      >
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto flex items-center justify-center relative">
          <div className="relative w-full">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              <img 
                key={currentImageIndex}
                src={carouselImages[currentImageIndex].src} 
                alt="Carousel Image" 
                className={`w-full h-auto max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[65vh] object-contain transition-all duration-700 ease-out relative z-10 select-none ${
                  imageLoaded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'
                } ${swipeDirection === 'left' ? 'animate-slide-left' : swipeDirection === 'right' ? 'animate-slide-right' : ''}`}
                style={{
                  filter: 'none',
                  boxShadow: 'none',
                  border: 'none',
                  outline: 'none'
                }}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
                draggable={false}
              />
            </div>
            
            {/* Left Arrow */}
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-14 z-20 p-2 rounded-full hover:bg-white/10 transition-colors duration-300 group"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 group-hover:text-gray-900 transition-colors" />
            </button>
            
            {/* Right Arrow */}
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-14 z-20 p-2 rounded-full hover:bg-white/10 transition-colors duration-300 group"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 group-hover:text-gray-900 transition-colors" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentImageIndex 
                      ? 'w-3 h-3 bg-gray-700' 
                      : 'w-2 h-2 bg-gray-400 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 mt-6">
          {carouselImages[currentImageIndex].artist === 'denys' ? (
            <a 
              href={carouselImages[currentImageIndex].instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-all duration-300 group"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium uppercase">{carouselImages[currentImageIndex].artist}</span>
            </a>
          ) : (
            <>
              <a 
                href="https://www.instagram.com/diivinu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">DIIVINU</span>
              </a>
              <a 
                href="https://instagram.com/lopz.of" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">LOPZ</span>
              </a>
            </>
          )}
        </div>
      </div>

      <div className={`absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 z-10 transition-all duration-1000 delay-300 ease-out ${
        discoLoaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-45'
      }`}>
        <img 
          src="/disco.png" 
          alt="Disco" 
          className="w-64 h-64 sm:w-72 sm:h-72 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain animate-spin-slow"
          style={{
            filter: 'none',
            boxShadow: 'none',
            border: 'none',
            outline: 'none'
          }}
          loading="lazy"
          onLoad={() => setDiscoLoaded(true)}
        />
      </div>

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
        @keyframes slide-left {
          0% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-30px);
          }
        }
        @keyframes slide-right {
          0% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(30px);
          }
        }
        .animate-slide-left {
          animation: slide-left 0.3s ease-out forwards;
        }
        .animate-slide-right {
          animation: slide-right 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Origem;