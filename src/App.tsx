import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Benefits from './components/Benefits';
import Projects from './components/Projects';
import Partners from './components/Partners';
import Testimonials from './components/Testimonials';
import ReviewForm from './components/ReviewForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Origem from './components/Origem';

type ViewType = 'home' | 'about' | 'projects' | 'contact' | 'partners' | 'origem';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Update page title
    document.title = 'Geneseez - Process Automation with n8n';
    
    // Update favicon (optional)
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (link) {
      link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3c4.971 0 9 4.029 9 9s-4.029 9-9 9-9-4.029-9-9 4.029-9 9-9z"/></svg>';
    }

    // Import fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Apply fonts to body
    document.body.style.fontFamily = "'Roboto', sans-serif";
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(fontLink);
      document.body.style.fontFamily = '';
    };
  }, []);

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleViewChange = (view: ViewType) => {
    if (currentView !== view) {
      setIsTransitioning(true);
      // Start fade out animation
      setTimeout(() => {
        setCurrentView(view);
        setIsTransitioning(false);
        // Scroll to top when changing views
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500); // Wait for fade out to complete
    }
  };

  const renderCurrentView = () => {
    const transitionClasses = `transition-all duration-500 ${
      isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
    }`;

    switch (currentView) {
      case 'home':
        return (
          <div className={transitionClasses}>
            <Hero onContactClick={handleContactClick} />
            <About />
            <Benefits />
            <Projects />
            <Partners onContactClick={handleContactClick} />
            <Testimonials />
            <ReviewForm />
            <Contact isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
          </div>
        );
      
      case 'about':
        return (
          <div className={transitionClasses}>
            <div className="pt-24">
              <About />
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className={transitionClasses}>
            <div className="pt-24">
              <Projects />
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className={transitionClasses}>
            <div className="pt-24">
              <Contact isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
              <Footer />
            </div>
          </div>
        );
      
      case 'partners':
        return (
          <div className={transitionClasses}>
            <div className="pt-24">
              <Partners onContactClick={handleContactClick} />
            </div>
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
            <Hero onContactClick={handleContactClick} />
            <About />
            <Benefits />
            <Projects />
            <Partners onContactClick={handleContactClick} />
            <Testimonials />
            <ReviewForm />
            <Contact isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        onViewChange={handleViewChange}
        currentView={currentView}
      />
      
      {renderCurrentView()}
      
      <WhatsAppButton />
    </div>
  );
}

export default App;