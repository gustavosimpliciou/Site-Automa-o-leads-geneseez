import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  createdAt: number;
  element: HTMLDivElement;
  updatePosition: () => void;
}

interface ActivationPoint {
  x: number;
  y: number;
  lastTrigger: number;
  interval: number;
  section: 'top' | 'middle' | 'bottom' | 'left' | 'right';
}

interface ParticleAnimationProps {
  isDark?: boolean;
  containerMode?: boolean;
}

const ParticleAnimation: React.FC<ParticleAnimationProps> = ({ isDark = false, containerMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const activationPointsRef = useRef<ActivationPoint[]>([]);
  const lastParticleTimeRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    const particles = particlesRef.current;
    const maxParticles = containerMode ? 60 : 80;
    const maxDistance = containerMode ? 150 : 250;
    const fadeTime = 3000;
    const particleInterval = containerMode ? 30 : 35;
    const numActivationPoints = containerMode ? 12 : 20;

    let width: number;
    let height: number;
    let animationFrameId: number;
    let containerRect: DOMRect;

    const resizeCanvas = () => {
      if (containerMode) {
        containerRect = container.getBoundingClientRect();
        width = canvas.width = containerRect.width * window.devicePixelRatio;
        height = canvas.height = containerRect.height * window.devicePixelRatio;
        canvas.style.width = `${containerRect.width}px`;
        canvas.style.height = `${containerRect.height}px`;
      } else {
        width = canvas.width = window.innerWidth * window.devicePixelRatio;
        height = canvas.height = window.innerHeight * window.devicePixelRatio;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
      }
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      initializeActivationPoints();
    };

    const getContainerDimensions = () => {
      if (containerMode) {
        return { w: containerRect?.width || 400, h: containerRect?.height || 400 };
      }
      return { w: window.innerWidth, h: window.innerHeight * 0.8 };
    };

    const getRandomPosition = (section: 'top' | 'middle' | 'bottom' | 'left' | 'right') => {
      const { w, h } = getContainerDimensions();
      const spread = 0.4;

      switch (section) {
        case 'top':
          return { x: Math.random() * w, y: Math.random() * (h * spread) };
        case 'middle':
          return { x: Math.random() * w, y: (h * 0.3) + Math.random() * (h * 0.4) };
        case 'bottom':
          return { x: Math.random() * w, y: (h * (1 - spread)) + Math.random() * (h * spread) };
        case 'left':
          return { x: Math.random() * (w * spread), y: Math.random() * h };
        case 'right':
          return { x: (w * (1 - spread)) + Math.random() * (w * spread), y: Math.random() * h };
      }
    };

    const initializeActivationPoints = () => {
      const sections: ('top' | 'middle' | 'bottom' | 'left' | 'right')[] = 
        ['top', 'middle', 'bottom', 'left', 'right'];
      
      activationPointsRef.current = Array(numActivationPoints).fill(null).map((_, index) => {
        const section = sections[index % sections.length];
        const pos = getRandomPosition(section);
        return {
          x: pos.x,
          y: pos.y,
          lastTrigger: Date.now(),
          interval: 1500 + Math.random() * 1000,
          section
        };
      });
    };

    class ParticleClass implements Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      opacity: number;
      size: number;
      createdAt: number;
      element: HTMLDivElement;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * (containerMode ? 0.8 : 1.2);
        this.vy = (Math.random() - 0.5) * (containerMode ? 0.8 : 1.2);
        this.opacity = 0.8;
        this.size = Math.random() * (containerMode ? 3 : 4) + 2;
        this.createdAt = Date.now();
        this.element = document.createElement('div');
        this.element.className = isDark ? 'particle-dark' : 'particle';
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        container.appendChild(this.element);
        this.updatePosition();
      }

      updatePosition() {
        const { w, h } = getContainerDimensions();
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > w) this.vx *= -0.8;
        if (this.y < 0 || this.y > h) this.vy *= -0.8;
        
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.element.style.opacity = String(this.opacity);
      }
    }

    const createParticle = (x: number, y: number) => {
      const now = Date.now();
      
      if (now - lastParticleTimeRef.current > particleInterval) {
        if (particles.length >= maxParticles) {
          const oldestParticle = particles.shift();
          if (oldestParticle?.element.parentNode) {
            oldestParticle.element.parentNode.removeChild(oldestParticle.element);
          }
        }
        
        particles.push(new ParticleClass(
          x + (Math.random() - 0.5) * 50,
          y + (Math.random() - 0.5) * 50
        ));
        lastParticleTimeRef.current = now;
      }
    };

    const updateActivationPoints = () => {
      const now = Date.now();
      activationPointsRef.current.forEach(point => {
        if (now - point.lastTrigger >= point.interval) {
          createParticle(point.x, point.y);
          point.lastTrigger = now;
          
          const newPos = getRandomPosition(point.section);
          point.x += (newPos.x - point.x) * 0.05;
          point.y += (newPos.y - point.y) * 0.05;
        }
      });
    };

    const drawConnections = () => {
      if (!ctx) return;
      
      const { w, h } = getContainerDimensions();
      ctx.clearRect(0, 0, w, h);
      const now = Date.now();

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        const age = now - particle.createdAt;
        
        if (age > fadeTime) {
          particle.opacity = Math.max(0, 0.8 * (1 - (age - fadeTime) / 1000));
          
          if (particle.opacity <= 0) {
            if (particle.element.parentNode) {
              particle.element.parentNode.removeChild(particle.element);
            }
            particles.splice(i, 1);
            continue;
          }
        }
        
        particle.updatePosition();
      }

      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - (distance / maxDistance)) * 0.3;
            const color = isDark ? `rgba(0, 0, 0, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      updateActivationPoints();
      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (containerMode) {
        const rect = container.getBoundingClientRect();
        containerRect = rect;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          mousePositionRef.current = { x, y };
          for (let i = 0; i < 3; i++) {
            createParticle(
              x + (Math.random() - 0.5) * 50,
              y + (Math.random() - 0.5) * 50
            );
          }
        }
      } else {
        mousePositionRef.current = { x: e.clientX, y: e.clientY };
        for (let i = 0; i < 3; i++) {
          createParticle(
            e.clientX + (Math.random() - 0.5) * 50,
            e.clientY + (Math.random() - 0.5) * 50
          );
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (containerMode) {
        const rect = container.getBoundingClientRect();
        containerRect = rect;
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          mousePositionRef.current = { x, y };
          for (let i = 0; i < 3; i++) {
            createParticle(
              x + (Math.random() - 0.5) * 50,
              y + (Math.random() - 0.5) * 50
            );
          }
        }
      } else {
        mousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        for (let i = 0; i < 3; i++) {
          createParticle(
            e.touches[0].clientX + (Math.random() - 0.5) * 50,
            e.touches[0].clientY + (Math.random() - 0.5) * 50
          );
        }
      }
    };

    initializeActivationPoints();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);

      particles.forEach(particle => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
      particlesRef.current = [];
    };
  }, [isDark, containerMode]);

  if (containerMode) {
    return (
      <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0" style={{ pointerEvents: 'auto' }}>
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden z-10" style={{ pointerEvents: 'auto' }}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
};

export default ParticleAnimation;