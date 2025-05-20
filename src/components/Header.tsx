import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'projects', label: 'Projetos' },
    { id: 'contact', label: 'Contato' },
    { id: 'partners', label: 'Tecnológias' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a 
            href="#home" 
            className="interactive-particle pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            <img 
              src={isScrolled ? '/logo3.png' : '/logo2.png'}
              alt="Geneseez" 
              className="h-8 transition-opacity duration-300"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`interactive-particle font-medium transition-colors duration-300 hover:text-gray-500 pointer-events-auto ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`md:hidden transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}
          aria-label="Alternar menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute w-full bg-white ${
          isOpen ? 'max-h-screen py-4 shadow-lg' : 'max-h-0 py-0 overflow-hidden'
        } transition-all duration-300 ease-in-out`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="interactive-particle text-black font-medium py-2 transition-colors duration-300 hover:text-gray-500 pointer-events-auto"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header