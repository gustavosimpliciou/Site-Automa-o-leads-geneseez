import React from 'react';
import { Cpu, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center mb-6">
            <Cpu className="w-6 h-6 mr-2 text-[#0cf]" />
            <span className="text-xl font-bold neon-text-blue">GENESEEZ IA</span>
          </div>
          <p className="text-gray-400 mb-6">
            Transformamos sua presença digital com tecnologia de ponta e soluções inteligentes para seu negócio.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://www.instagram.com/geneseez/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-[#0cf] transition-colors duration-300"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61569243569140" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-[#0cf] transition-colors duration-300"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-6">Links Rápidos</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link></li>
            <li><a href="#benefits" className="text-gray-400 hover:text-white transition-colors duration-300">Benefícios</a></li>
            <li><Link to="/sobre" className="text-gray-400 hover:text-white transition-colors duration-300">Sobre Nós</Link></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-6">Contato</h3>
          <ul className="space-y-4">
            <li className="flex items-center">
              <Mail size={18} className="mr-3 text-[#0cf]" />
              <span className="text-gray-400">ageneseez@gmail.com</span>
            </li>
            <li className="flex items-center">
              <Phone size={18} className="mr-3 text-[#0cf]" />
              <span className="text-gray-400">(83) 99141-1822</span>
            </li>
            <li className="flex items-start">
              <MapPin size={18} className="mr-3 mt-1 text-[#0cf]" />
              <span className="text-gray-400">Av. Paulista, 1000 - São Paulo, SP</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} GENESEEZ IA. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;