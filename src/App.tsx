import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Footer from './components/Footer';
import PopupForm from './components/PopupForm';
import { usePopupTimer } from './hooks/usePopupTimer';

function App() {
  const { showPopup, setShowPopup } = usePopupTimer(5000);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-poppins">
      <Header />
      <Hero onCtaClick={() => setShowPopup(true)} />
      <Benefits />
      <Footer />
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default App;