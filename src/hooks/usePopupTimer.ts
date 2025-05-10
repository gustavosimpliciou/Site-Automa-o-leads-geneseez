import { useState, useEffect } from 'react';

export const usePopupTimer = (delayMs: number) => {
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    // Show popup after the specified delay
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, delayMs);
    
    // Clear timeout on unmount
    return () => clearTimeout(timer);
  }, [delayMs]);
  
  return { showPopup, setShowPopup };
};