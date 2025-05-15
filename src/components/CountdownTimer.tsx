import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 34,
    minutes: 19,
    seconds: 59
  });
  const [spotsLeft] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }

        let newHours = prevTime.hours;
        let newMinutes = prevTime.minutes;
        let newSeconds = prevTime.seconds - 1;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 py-3">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <div className="flex items-center gap-2 text-[#0cf]">
          <Timer className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-semibold text-sm sm:text-base">Oferta Especial:</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <span className="text-gray-300">Apenas</span>
          <span className="text-[#0cfa83] font-bold">{spotsLeft} vagas</span>
          <span className="text-gray-300">com</span>
          <span className="text-[#0cf] font-bold">30% OFF</span>
        </div>
        
        <div className="flex items-center gap-1 text-sm sm:text-base">
          <span className="text-gray-300">Expira em:</span>
          <div className="flex items-center gap-1">
            <span className="bg-slate-800 px-2 py-1 rounded font-mono font-bold text-[#0cf]">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[#0cf]">:</span>
            <span className="bg-slate-800 px-2 py-1 rounded font-mono font-bold text-[#0cf]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[#0cf]">:</span>
            <span className="bg-slate-800 px-2 py-1 rounded font-mono font-bold text-[#0cf]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;