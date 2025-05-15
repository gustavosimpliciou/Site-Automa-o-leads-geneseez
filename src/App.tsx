import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import PopupForm from './components/PopupForm';
import About from './components/About';
import { usePopupTimer } from './hooks/usePopupTimer';

function HomePage() {
  const { showPopup, setShowPopup } = usePopupTimer(5000);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Hero onCtaClick={scrollToPricing} />
      <Portfolio />
      <Benefits />
      <Pricing onCtaClick={() => setShowPopup(true)} />
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-poppins">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;