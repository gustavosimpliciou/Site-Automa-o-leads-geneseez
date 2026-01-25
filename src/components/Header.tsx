import { useState, useEffect, memo } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';

type ViewType = 'home' | 'about' | 'projects' | 'origem';

interface HeaderProps {
  onViewChange: (view: ViewType) => void;
  currentView: ViewType;
}

const HeaderComponent: React.FC<HeaderProps> = ({ onViewChange, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (view: ViewType) => {
    onViewChange(view);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    onViewChange('home');
  };

  const menuItems: { id: ViewType; label: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'projects', label: 'Imersão' },
    { id: 'origem', label: 'Artistas' }
  ];

  const isSpecialView = currentView !== 'home';
  const isDarkBackground = !isSpecialView && !isScrolled;

  return (
    <header 
      className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isSpecialView ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          {isSpecialView && (
            <button
              onClick={() => onViewChange('home')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft size={20} className="text-black" />
            </button>
          )}
          <button 
            className="interactive-particle pointer-events-auto"
            onClick={handleLogoClick}
          >
            <img 
              src={isScrolled || isSpecialView ? '/logo3.png' : '/logo2.png'}
              alt="Geneseez" 
              className="h-9 transition-all duration-500"
              loading="eager"
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`interactive-particle font-medium transition-all duration-300 hover:text-gray-500 pointer-events-auto px-3 py-2 rounded-md flex items-center gap-1.5 ${
                (isScrolled || isSpecialView) ? 'text-black' : 'text-white'
              } ${
                currentView === item.id 
                  ? 'font-bold' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleMenuClick(item.id)}
            >
              {item.label}
              {currentView === item.id && (
                <div 
                  className={`w-1 h-1 rounded-full ${
                    isDarkBackground ? 'bg-white' : 'bg-black'
                  }`}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`md:hidden transition-colors duration-300 ${(isScrolled || isSpecialView) ? 'text-black' : 'text-white'}`}
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
        <div className="container mx-auto px-4 flex flex-col space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`interactive-particle font-medium py-3 px-4 transition-all duration-300 hover:text-gray-500 pointer-events-auto text-left rounded-md flex items-center justify-between ${
                currentView === item.id 
                  ? 'font-bold bg-gray-100 text-black shadow-sm' 
                  : 'text-black hover:bg-gray-50'
              }`}
              onClick={() => handleMenuClick(item.id)}
            >
              {item.label}
              {currentView === item.id && (
                <div className="w-1 h-1 rounded-full bg-black" />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

const Header = memo(HeaderComponent);
export default Header;
