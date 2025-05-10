import React from 'react';
import { Cpu, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const scrollToBenefits = (e: React.MouseEvent) => {
    e.preventDefault();
    const benefitsSection = document.getElementById('benefits');
    if (benefitsSection && location.pathname === '/') {
      benefitsSection.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      window.location.href = '/#benefits';
    }
  };

  return (
    <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <Cpu className="w-8 h-8 mr-2 text-[#0cf]" />
        <span className="text-xl font-bold neon-text-blue">IA Sites</span>
      </Link>
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">Home</Link>
        <a href="#benefits" onClick={scrollToBenefits} className="text-gray-300 hover:text-white transition-colors duration-300">Benefícios</a>
        <Link to="/sobre" className="text-gray-300 hover:text-white transition-colors duration-300">Sobre</Link>
      </nav>
      <div>
        <a 
          href="mailto:contato@iasites.com.br"
          className="px-4 py-2 text-sm bg-transparent border border-[#0cf] text-[#0cf] rounded-lg hover:bg-[#0cf]/10 transition-all duration-300 flex items-center"
        >
          <Mail size={16} className="mr-2" />
          Contato
        </a>
      </div>
    </header>
  );
};

export default Header;