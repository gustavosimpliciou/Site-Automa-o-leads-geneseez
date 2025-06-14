import React, { useState, useEffect } from 'react';

const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after scrolling down
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/83991411822"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      aria-label="Contact us on WhatsApp"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.4031 3.5714C18.2089 1.3769 15.3053 0.0004 12.2014 0C5.54031 0 0.102884 5.4382 0.100399 12.1021C0.0979142 14.2501 0.636791 16.3492 1.67908 18.2041L0 24L5.95235 22.3605C7.7373 23.3035 9.74908 23.8018 11.799 23.8025H11.8014C18.4607 23.8025 23.8994 18.3629 23.9019 11.699C23.9031 8.612 22.5978 5.7655 20.4031 3.5714ZM12.2014 21.8211H12.1994C10.3573 21.8204 8.55272 21.3474 6.9687 20.4639L6.61267 20.2589L2.86235 21.2542L3.87246 17.5902L3.64662 17.2232C2.66773 15.5811 2.14834 13.6927 2.15087 11.7513C2.15087 6.5277 6.67169 2.3261 12.2039 2.3261C14.7657 2.3265 17.1698 3.4468 18.9769 5.2541C20.784 7.0613 21.9024 9.4661 21.9014 12.0273C21.899 17.7732 17.3782 21.8211 12.2014 21.8211ZM17.7166 14.5705C17.4187 14.4214 15.9103 13.6782 15.6371 13.5787C15.3639 13.4796 15.164 13.4299 14.9637 13.7281C14.7635 14.0264 14.1729 14.72 13.9978 14.9202C13.8227 15.1205 13.6476 15.1453 13.3497 14.9962C13.0518 14.8471 12.0619 14.523 10.8788 13.4796C9.95272 12.6642 9.33217 11.6534 9.15707 11.3551C8.98196 11.0569 9.13829 10.895 9.28835 10.7462C9.42351 10.6107 9.58648 10.3945 9.73655 10.2194C9.88662 10.0443 9.93634 9.9199 10.0356 9.7197C10.1353 9.5195 10.0859 9.3444 10.011 9.1953C9.93634 9.0462 9.3174 7.5359 9.06723 6.9394C8.82459 6.3593 8.57819 6.4398 8.39557 6.4291C8.22047 6.4194 8.02022 6.4169 7.81997 6.4169C7.61973 6.4169 7.29662 6.4917 7.02345 6.79C6.75029 7.0882 5.9585 7.8314 5.9585 9.3417C5.9585 10.852 7.04846 12.313 7.19854 12.5132C7.34861 12.7134 9.32949 15.7597 12.3524 17.0975C13.0903 17.4171 13.6661 17.6146 14.1145 17.7638C14.8498 18.0072 15.5182 17.9717 16.0443 17.8945C16.6335 17.8085 17.8661 17.1496 18.116 16.4539C18.3659 15.7582 18.3659 15.1616 18.291 15.0373C18.2161 14.913 18.0158 14.8383 17.7166 14.5705Z"
          fill="currentColor"
        />
      </svg>
      
      {/* Pulse animation ring */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
    </a>
  );
};

export default WhatsAppButton;