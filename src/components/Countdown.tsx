import { useState, useEffect } from 'react';

interface CountdownProps {
  isHome: boolean;
  isPopup?: boolean;
}

const Countdown: React.FC<CountdownProps> = ({ isHome, isPopup = false }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-01-09T00:00:00-03:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const brasiliaOffset = -3 * 60;
      const localOffset = now.getTimezoneOffset();
      const brasiliaTime = new Date(now.getTime() + (localOffset + brasiliaOffset) * 60 * 1000);
      
      const difference = targetDate.getTime() - brasiliaTime.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  if (isPopup) {
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="text-gray-400 text-xs uppercase tracking-wider">Lançamento</span>
        <div className="flex items-center gap-2 text-white">
          <span className="font-bold text-lg">{formatNumber(timeLeft.days)}d</span>
          <span className="text-gray-500">:</span>
          <span className="font-bold text-lg">{formatNumber(timeLeft.hours)}h</span>
          <span className="text-gray-500">:</span>
          <span className="font-bold text-lg">{formatNumber(timeLeft.minutes)}m</span>
          <span className="text-gray-500">:</span>
          <span className="font-bold text-lg">{formatNumber(timeLeft.seconds)}s</span>
        </div>
      </div>
    );
  }

  if (isHome) {
    return (
      <div className="flex flex-col items-center gap-2 mt-8">
        <span className="text-gray-500 text-xs uppercase tracking-wider">Lançamento</span>
        <div className="flex items-center gap-3 text-white">
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold">{formatNumber(timeLeft.days)}</span>
            <span className="text-xs text-gray-400 uppercase">Dias</span>
          </div>
          <span className="text-2xl text-gray-500">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold">{formatNumber(timeLeft.hours)}</span>
            <span className="text-xs text-gray-400 uppercase">Horas</span>
          </div>
          <span className="text-2xl text-gray-500">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold">{formatNumber(timeLeft.minutes)}</span>
            <span className="text-xs text-gray-400 uppercase">Min</span>
          </div>
          <span className="text-2xl text-gray-500">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold">{formatNumber(timeLeft.seconds)}</span>
            <span className="text-xs text-gray-400 uppercase">Seg</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-cyan-500/90 via-black/90 to-cyan-500/90 backdrop-blur-sm py-2">
      <div className="container mx-auto px-4 flex items-center justify-center gap-4">
        <span className="text-gray-300 text-xs uppercase tracking-wider hidden sm:inline">Lançamento</span>
        <div className="flex items-center gap-2 text-white text-sm">
          <span className="font-bold">{formatNumber(timeLeft.days)}d</span>
          <span className="text-gray-500">:</span>
          <span className="font-bold">{formatNumber(timeLeft.hours)}h</span>
          <span className="text-gray-500">:</span>
          <span className="font-bold">{formatNumber(timeLeft.minutes)}m</span>
          <span className="text-gray-500">:</span>
          <span className="font-bold">{formatNumber(timeLeft.seconds)}s</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
