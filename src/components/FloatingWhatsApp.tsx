import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/5583991411822"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#0cfa83] hover:bg-[#0cfa83]/90 transition-all duration-300 shadow-lg hover:shadow-[#0cfa83]/20 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      aria-label="WhatsApp"
    >
      <MessageSquare className="w-6 h-6 text-slate-900" />
    </a>
  );
};

export default FloatingWhatsApp;