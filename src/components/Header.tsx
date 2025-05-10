import React from 'react';
import { Cpu, MessageSquare } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const scrollToBenefits = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      // If we're not on the home page, navigate first then scroll
      navigate('/', { replace: true });
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const benefitsSection = document.getElementById('benefits');
        if (benefitsSection) {
          benefitsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on the home page, just scroll
      const benefitsSection = document.getElementById('benefits');
      if (benefitsSection) {
        benefitsSection.scrollIntoView({ behavior: 'smooth' });
      }
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
      <a 
        href="https://wa.me/83999806248"
        className="px-4 py-2 text-sm bg-transparent border border-[#0cfa83] text-[#0cfa83] rounded-lg hover:bg-[#0cfa83]/10 transition-all duration-300 flex items-center"
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