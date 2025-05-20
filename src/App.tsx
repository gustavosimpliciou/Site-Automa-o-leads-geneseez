import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Benefits from './components/Benefits';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import ReviewForm from './components/ReviewForm';
import Pricing from './components/Pricing';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  useEffect(() => {
    // Update page title
    document.title = 'Genessez - Process Automation with n8n';
    
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

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Benefits />
      <Projects />
      <Testimonials />
      <ReviewForm />
      <Pricing />
      <Partners />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;