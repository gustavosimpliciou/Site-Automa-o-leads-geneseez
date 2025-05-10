import React from 'react';
import { Cpu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center">
        <Cpu className="w-8 h-8 mr-2 text-[#0cf]" />
        <span className="text-xl font-bold neon-text-blue">IA Sites</span>
      </div>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Home</a>
        <a href="#benefits" className="text-gray-300 hover:text-white transition-colors duration-300">Benefícios</a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Sobre</a>
      </nav>
      <div>
        <button className="px-4 py-2 text-sm bg-transparent border border-[#0cf] text-[#0cf] rounded-lg hover:bg-[#0cf]/10 transition-all duration-300">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;