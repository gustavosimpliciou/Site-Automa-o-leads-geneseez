import React, { useState } from 'react';
import { MessageSquare, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrollToBenefits = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
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
    <header className="w-full py-4 px-4 md:px-12 flex justify-between items-center relative">
      <Link to="/" className="flex items-center z-20">
        <img src="/image/logo2.png" alt="Geneseez Logo" className="w-8 h-8 mr-2" />
        <span className="text-xl font-bold neon-text-blue">GENESEEZ IA</span>
      </Link>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden z-20 text-gray-300 hover:text-white transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div className={`
        fixed inset-0 bg-slate-900/95 z-10 md:hidden transition-transform duration-300
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col items-center justify-center gap-8
      `}>
        <Link 
          to="/" 
          className="text-xl text-gray-300 hover:text-white transition-colors duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <a 
          href="#benefits" 
          onClick={scrollToBenefits}
          className="text-xl text-gray-300 hover:text-white transition-colors duration-300"
        >
          Benefícios
        </a>
        <Link 
          to="/sobre" 
          className="text-xl text-gray-300 hover:text-white transition-colors duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Sobre
        </Link>
        <a 
          href="https://wa.me/5583991411822"
          className="px-6 py-3 text-base bg-transparent border border-[#0cfa83] text-[#0cfa83] rounded-lg hover:bg-[#0cfa83]/10 transition-all duration-300 flex items-center"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMenuOpen(false)}
        >
          <MessageSquare size={16} className="mr-2" />
          WhatsApp
        </a>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">Home</Link>
        <a href="#benefits" onClick={scrollToBenefits} className="text-gray-300 hover:text-white transition-colors duration-300">Benefícios</a>
        <Link to="/sobre" className="text-gray-300 hover:text-white transition-colors duration-300">Sobre</Link>
      </nav>

      {/* Desktop WhatsApp Button */}
      <a 
        href="https://wa.me/5583991411822"
        className="hidden md:flex px-4 py-2 text-sm bg-transparent border border-[#0cfa83] text-[#0cfa83] rounded-lg hover:bg-[#0cfa83]/10 transition-all duration-300 items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageSquare size={16} className="mr-2" />
        WhatsApp
      </a>
    </header>
  );
};

export default Header;