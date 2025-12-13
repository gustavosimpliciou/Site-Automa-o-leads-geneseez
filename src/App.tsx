import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Origem from './components/Origem';
import Countdown from './components/Countdown';
import ParticleAnimation from './components/ParticleAnimation';

type ViewType = 'home' | 'about' | 'projects' | 'origem';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.title = 'Geneseez - Onde Tudo Comeca';
    
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (link) {
      link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3c4.971 0 9 4.029 9 9s-4.029 9-9 9-9-4.029-9-9 4.029-9 9-9z"/></svg>';
    }

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    document.body.style.fontFamily = "'Roboto', sans-serif";
    
    return () => {
      document.head.removeChild(fontLink);
      document.body.style.fontFamily = '';
    };
  }, []);

  const handleViewChange = (view: ViewType) => {
    if (currentView !== view) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentView(view);
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
    }
  };

  const handleProjectsClick = () => {
    handleViewChange('projects');
  };

  const renderCurrentView = () => {
    const transitionClasses = `transition-all duration-500 ${
      isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
    }`;

    switch (currentView) {
      case 'home':
        return (
          <div className={transitionClasses}>
            <Hero onProjectsClick={handleProjectsClick} />
            <About />
            <Projects onHomeClick={() => handleViewChange('home')} />
            <Footer onViewChange={handleViewChange} />
          </div>
        );
      
      case 'about':
        return (
          <div className={transitionClasses}>
            <div className="pt-24">
              <About />
            </div>
            <Footer onViewChange={handleViewChange} />
          </div>
        );
      
      case 'projects':
        return (
          <div className={transitionClasses}>
            <div className="pt-24">
              <Projects onHomeClick={() => handleViewChange('home')} />
            </div>
            <Footer onViewChange={handleViewChange} />
          </div>
        );
      
      case 'origem':
        return (
          <div className={transitionClasses}>
            <Origem />
          </div>
        );
      
      default:
        return (
          <div className={transitionClasses}>
            <Hero onProjectsClick={handleProjectsClick} />
            <About />
            <Projects onHomeClick={() => handleViewChange('home')} />
            <Footer onViewChange={handleViewChange} />
          </div>
        );
    }
  };

  const isDarkBackground = currentView === 'home' || currentView === 'projects';

  return (
    <div className="min-h-screen interactive-particle">
      <ParticleAnimation isDark={!isDarkBackground} />
      {currentView !== 'home' && <Countdown isHome={false} />}
      <Header 
        onViewChange={handleViewChange}
        currentView={currentView}
      />
      
      {renderCurrentView()}
    </div>
  );
}

export default App;
