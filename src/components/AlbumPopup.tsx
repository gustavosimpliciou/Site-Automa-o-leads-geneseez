import { useEffect } from 'react';
import { X, Music, Users, Bell } from 'lucide-react';

interface AlbumPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onListenClick?: () => void;
}

const AlbumPopup: React.FC<AlbumPopupProps> = ({ isOpen, onClose, onListenClick }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden overflow-y-auto max-h-[90vh] w-full mx-4 shadow-2xl animate-fadeIn max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="relative">
          <div className="aspect-square relative overflow-hidden">
            <img 
              src="/capaextase999.png" 
              alt="EXTASE 999" 
              className="w-full h-full object-cover transition-opacity duration-700 opacity-0"
              loading="lazy"
              onLoad={(e) => e.currentTarget.classList.replace('opacity-0', 'opacity-100')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-green-500 text-xs uppercase tracking-wider mb-1 font-medium">Novo Lancamento 2026</p>
            <h3 className="text-white text-3xl md:text-4xl font-bold uppercase">EXTASE 999</h3>
            <p className="text-gray-300 text-sm mt-1">DIIVINU X LOPZ</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-center">
            <h4 className="text-white text-lg font-semibold mb-2">Faca Parte do Nosso Canal</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fique por dentro de todos os lancamentos, bastidores exclusivos e conteudos especiais. 
              Seja o primeiro a ouvir!
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 py-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Music className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-xs text-gray-400">9 Faixas</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-xs text-gray-400">Canal</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-xs text-gray-400">Alertas</span>
            </div>
          </div>

          <div className="space-y-3">
            <a 
              href="https://www.instagram.com/channel/AbaqTZjsIPKyKebz/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-6 rounded-full text-center uppercase tracking-wider transition-all duration-300 hover:scale-[1.02]"
            >
              Participar do Canal
            </a>
            {onListenClick && (
              <button 
                onClick={() => { onClose(); onListenClick(); }}
                className="block w-full bg-white hover:bg-gray-100 text-black font-bold py-3 px-6 rounded-full text-center uppercase tracking-wider transition-all duration-300"
              >
                Ir Para o Album
              </button>
            )}
            <button 
              onClick={onClose}
              className="block w-full bg-transparent border border-gray-600 hover:border-white text-white font-medium py-3 px-6 rounded-full text-center uppercase tracking-wider transition-all duration-300"
            >
              Fechar
            </button>
          </div>

          <p className="text-center text-gray-500 text-xs">
            Ao participar do canal, voce recebera atualizacoes sobre lancamentos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumPopup;