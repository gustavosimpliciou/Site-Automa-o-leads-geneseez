import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Heart, MoreHorizontal, Clock, Music2 } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  duration: string;
  artist: string;
  isPlaying?: boolean;
}

const Projects: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(1);
  const [liked, setLiked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const tracks: Track[] = [
    { id: 1, title: 'DESACREDITOU', duration: '3:12', artist: 'LOPZ, DIIVINU' },
    { id: 2, title: 'VIDA', duration: '3:11', artist: 'DIIVINU' },
    { id: 3, title: 'PREFÁCIL', duration: '3:50', artist: 'LOPZ' },
    { id: 4, title: 'BAILA COMIGO', duration: '2:17', artist: 'LOPZ' },
    { id: 5, title: 'FICA UM POUCO MAIS', duration: '3:00', artist: 'LOPZ' },
    { id: 6, title: 'GENESEEZ', duration: '2:00', artist: 'DIIVINU' },
    { id: 7, title: 'SINTONIA', duration: '3:04', artist: 'DIIVINU' },
    { id: 8, title: 'APOGEU', duration: '3:00', artist: 'DIIVINU, LOPZ' },
    { id: 9, title: '999!', duration: '4:26', artist: 'DIIVINU, LOPZ' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleTrackClick = (trackId: number) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);
  };

  const scrollToListenButton = () => {
    const listenButton = document.getElementById('listen-album-btn');
    if (listenButton) {
      listenButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
      listenButton.classList.add('ring-4', 'ring-green-300', 'ring-opacity-50');
      setTimeout(() => {
        listenButton.classList.remove('ring-4', 'ring-green-300', 'ring-opacity-50');
      }, 2000);
    }
  };

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-gray-900 via-black to-black min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white uppercase tracking-wide">IMERSÃO</h2>
        
        {/* Album Container - Spotify Style */}
        <div 
          ref={containerRef}
          className="max-w-4xl mx-auto bg-gradient-to-b from-purple-900/40 to-black/80 rounded-xl overflow-hidden transition-all duration-700 opacity-0 translate-y-10"
        >
          {/* Album Header */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-end">
            {/* Album Cover */}
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg shadow-2xl relative overflow-hidden group">
              <img 
                src="/capaextase999.png" 
                alt="ÊXTASE 999" 
                className="w-full h-full object-cover"
              />
              {/* Play overlay on hover */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={scrollToListenButton}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause className="w-7 h-7 text-black" /> : <Play className="w-7 h-7 text-black ml-1" />}
                </button>
              </div>
            </div>

            {/* Album Info */}
            <div className="text-center md:text-left flex-1">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-1">ÁLBUM 2026</p>
              <h3 className="text-white text-4xl md:text-5xl font-bold mb-3 uppercase">ÊXTASE 999</h3>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300 flex-wrap">
                <span className="font-semibold text-white">DIIVINU</span>
                <span className="text-gray-500">X</span>
                <span className="font-semibold text-white">LOPZ</span>
                <span className="text-gray-500 mx-2">|</span>
                <span>2026</span>
                <span className="text-gray-500 mx-2">|</span>
                <span>9 FAIXAS</span>
              </div>
              <p className="text-gray-400 text-sm mt-4 max-w-md">
               O primeiro álbum de lançamentos da Geneseez tem como 
               intuito explorar a musicalidade e talento dos artistas 
               DIIVINU e LOPZ através de composições autorais, o objetivo desse 
               projeto é obter resultados inovadores com todo o esforço e conhecimento 
               desenvolvido por ambos durante o processo de criação. Esperamos que nossas 
               canções te alcancem onde quer que você as escute.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 md:px-8 pb-4 flex items-center gap-4">
            <button 
              onClick={scrollToListenButton}
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform hover:bg-green-400"
            >
              {isPlaying ? <Pause className="w-6 h-6 text-black" /> : <Play className="w-6 h-6 text-black ml-1" />}
            </button>
            <button 
              onClick={() => setLiked(!liked)}
              className={`p-2 transition-colors ${liked ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
            >
              <Heart className={`w-8 h-8 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal className="w-8 h-8" />
            </button>
          </div>

          {/* Track List */}
          <div className="px-4 md:px-8 pb-8">
            {/* Header */}
            <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[40px_1fr_100px] gap-4 px-4 py-2 text-gray-400 text-xs uppercase tracking-wider border-b border-white/10 mb-2">
              <span className="text-center">#</span>
              <span>TÍTULO</span>
              <span className="text-right flex items-center justify-end">
                <Clock className="w-4 h-4" />
              </span>
            </div>

            {/* Tracks */}
            <div className="space-y-1">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => handleTrackClick(track.id)}
                  className={`grid grid-cols-[auto_1fr_auto] md:grid-cols-[40px_1fr_100px] gap-4 px-4 py-3 rounded-md cursor-pointer group transition-colors ${
                    currentTrack === track.id 
                      ? 'bg-white/20' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className={`text-center text-sm ${currentTrack === track.id ? 'text-green-500' : 'text-gray-400'}`}>
                    {currentTrack === track.id && isPlaying ? (
                      <Music2 className="w-4 h-4 mx-auto animate-pulse" />
                    ) : (
                      <span className="group-hover:hidden">{track.id}</span>
                    )}
                    <Play className="w-4 h-4 mx-auto hidden group-hover:block" />
                  </span>
                  <div className="flex flex-col">
                    <span className={`text-sm font-medium uppercase ${currentTrack === track.id ? 'text-green-500' : 'text-white'}`}>
                      {track.title}
                    </span>
                    <span className="text-xs text-gray-400">{track.artist}</span>
                  </div>
                  <span className="text-right text-sm text-gray-400">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Listen Button */}
          <div className="px-6 md:px-8 pb-8">
            <a 
              id="listen-album-btn"
              href="#" 
              className="block w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-full text-center uppercase tracking-wider transition-all duration-300 hover:scale-[1.02]"
            >
              OUVIR ÁLBUM
            </a>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">EM BREVE</p>
          <p className="text-gray-400">Mais projetos estão a caminho. Fique ligado.</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
