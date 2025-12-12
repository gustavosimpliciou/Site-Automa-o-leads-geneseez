import { Instagram, Youtube, Music } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img 
              src="/logo2.png" 
              alt="Geneseez" 
              className="h-8 mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed uppercase">
              ONDE TUDO COMEÇA. MÚSICA, ARTE, DESIGN, VÍDEO E FOTOGRAFIA. 
              TRANSFORMAMOS IDEIAS EM OBRAS QUE PERMANECEM.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">NAVEGAÇÃO</h3>
            <ul className="space-y-2 text-gray-400 text-sm uppercase">
              <li><span className="hover:text-white cursor-pointer transition-colors">INÍCIO</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">SOBRE</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">PROJETOS</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">ORIGEM</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">CONECTE-SE</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Spotify">
                <Music size={20} />
              </a>
            </div>
            <p className="text-gray-500 text-xs mt-4 uppercase">
              NOVO LANÇAMENTO: ÊXTASE 999
            </p>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm uppercase">
            {new Date().getFullYear()} GENESEEZ. CRIANDO DESDE O INÍCIO.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
