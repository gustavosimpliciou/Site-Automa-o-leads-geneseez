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
            <p className="text-gray-400 text-sm leading-relaxed">
              Onde tudo começa. 
              Transformamos ideias em obras que permanecem.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">NAVEGAÇÃO</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><span className="hover:text-white cursor-pointer transition-colors">Início</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Sobre</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Imersão Completa</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Origem</span></li>
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
            <p className="text-gray-500 text-xs mt-4">
              Novo lançamento: ÊXTASE 999
            </p>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            {new Date().getFullYear()} Geneseez. Criando desde o início.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
