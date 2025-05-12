import React from 'react';
import { MessageSquare, FileText } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const scrollToBenefits = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        const benefitsSection = document.getElementById('benefits');
        if (benefitsSection) {
          benefitsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const benefitsSection = document.getElementById('benefits');
      if (benefitsSection) {
        benefitsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <img src="/image/logo2.png" alt="Geneseez Logo" className="w-8 h-8 mr-2" />
        <span className="text-xl font-bold neon-text-blue">GENESEEZ IA</span>
      </Link>
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">Home</Link>
        <a href="#benefits" onClick={scrollToBenefits} className="text-gray-300 hover:text-white transition-colors duration-300">Benefícios</a>
        <Link to="/sobre" className="text-gray-300 hover:text-white transition-colors duration-300">Sobre</Link>
      </nav>
      <div className="flex space-x-4">
        <Link 
          to="/formulario"
          className="px-4 py-2 text-sm bg-transparent border border-[#b45afb] text-[#b45afb] rounded-lg hover:bg-[#b45afb]/10 transition-all duration-300 flex items-center"
        >
          <FileText size={16} className="mr-2" />
          Formulário
        </Link>
        <a 
          href="https://wa.me/5583999806248"
          className="px-4 py-2 text-sm bg-transparent border border-[#0cfa83] text-[#0cfa83] rounded-lg hover:bg-[#0cfa83]/10 transition-all duration-300 flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageSquare size={16} className="mr-2" />
          WhatsApp
        </a>
      </div>
    </header>
  );
};

export default Header;