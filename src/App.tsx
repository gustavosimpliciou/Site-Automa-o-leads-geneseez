import { useEffect, useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Countdown from './components/Countdown';
import PreSavePopup from './components/PreSavePopup';

const Origem = lazy(() => import('./components/Origem'));

type ViewType = 'home' | 'about' | 'projects' | 'origem';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPreSavePopupOpen, setIsPreSavePopupOpen] = useState(false);

  useEffect(() => {
    document.title = 'Geneseez - Onde Tudo Comeca';
    
    // Mostrar popup de pré-save ao carregar a página
    const timer = setTimeout(() => {
      setIsPreSavePopupOpen(true);
    }, 1500);
    
    return () => {
      clearTimeout(timer);
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
            <About showCristo={false} />
            <Projects onHomeClick={() => handleViewChange('home')} showCristo={false} />
            <Footer onViewChange={handleViewChange} />
          </div>
        );
      
      case 'about':
        return (
          <div className={transitionClasses}>
            <div className="pt-24">
              <About showCristo={true} />
            </div>
            <Footer onViewChange={handleViewChange} />
          </div>
        );
      
      case 'projects':
        return (
          <div className={transitionClasses}>
            <div className="pt-24">
              <Projects onHomeClick={() => handleViewChange('home')} showCristo={true} />
            </div>
            <Footer onViewChange={handleViewChange} />
          </div>
        );
      
      case 'origem':
        return (
          <div className={transitionClasses}>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
              <Origem />
            </Suspense>
          </div>
        );
      
      default:
        return (
          <div className={transitionClasses}>
            <Hero onProjectsClick={handleProjectsClick} />
            <About showCristo={false} />
            <Projects onHomeClick={() => handleViewChange('home')} showCristo={false} />
            <Footer onViewChange={handleViewChange} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {currentView !== 'home' && <Countdown isHome={false} />}
      <Header 
        onViewChange={handleViewChange}
        currentView={currentView}
      />
      
      {renderCurrentView()}
      
      <PreSavePopup 
        isOpen={isPreSavePopupOpen}
        onClose={() => setIsPreSavePopupOpen(false)}
      />
    </div>
  );
}

export default App;