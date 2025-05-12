import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Footer from './components/Footer';
import PopupForm from './components/PopupForm';
import About from './components/About';
import FormPage from './components/FormPage';
import { usePopupTimer } from './hooks/usePopupTimer';

function HomePage() {
  const { showPopup, setShowPopup } = usePopupTimer(5000);

  return (
    <>
      <Hero onCtaClick={() => setShowPopup(true)} />
      <Benefits />
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
          <Route path="/formulario" element={<FormPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;