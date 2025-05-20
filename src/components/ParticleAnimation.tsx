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
}

interface ActivationPoint {
  x: number;
  y: number;
  lastTrigger: number;
  interval: number;
  section: 'top' | 'middle' | 'bottom' | 'left' | 'right';
}

const ParticleAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const activationPointsRef = useRef<ActivationPoint[]>([]);
  const isInteractingRef = useRef(false);
  const lastParticleTimeRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    const particles = particlesRef.current;
    const maxParticles = 100; // Increased for more coverage
    const maxDistance = 250; // Increased connection distance
    const fadeTime = 3000; // Longer fade time
    const particleInterval = 60; // Faster particle creation
    const numActivationPoints = 25; // More activation points for better coverage

    let width: number;
    let height: number;
    let animationFrameId: number;

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth * window.devicePixelRatio;
      height = canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      initializeActivationPoints();
    };

    const getRandomPosition = (section: 'top' | 'middle' | 'bottom' | 'left' | 'right') => {
      const w = window.innerWidth;
      const h = window.innerHeight * 0.8;
      const spread = 0.4; // Increased spread factor

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
          interval: 1500 + Math.random() * 1000, // Faster intervals
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
        this.vx = (Math.random() - 0.5) * 1.2; // Increased velocity
        this.vy = (Math.random() - 0.5) * 1.2;
        this.opacity = 0.8;
        this.size = Math.random() * 4 + 2;
        this.createdAt = Date.now();
        this.element = document.createElement('div');
        this.element.className = 'particle';
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        container.appendChild(this.element);
        this.updatePosition();
      }

      updatePosition() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce with more energy
        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -0.8;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -0.8;
        
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.element.style.opacity = String(this.opacity);
      }
    }

    const createParticle = (x: number, y: number) => {
      const now = Date.now();
      
      if (now - lastParticleTimeRef.current > particleInterval) {
        if (particles.length >= maxParticles) {
          // Remove oldest particle
          const oldestParticle = particles.shift();
          if (oldestParticle?.element.parentNode) {
            oldestParticle.element.parentNode.removeChild(oldestParticle.element);
          }
        }
        
        particles.push(new ParticleClass(
          x + (Math.random() - 0.5) * 50, // Add spread to new particles
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
          point.x += (newPos.x - point.x) * 0.05; // Faster point movement
          point.y += (newPos.y - point.y) * 0.05;
        }
      });
    };

    const drawConnections = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);
      const now = Date.now();

      // Update and fade particles
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

      // Draw connections with gradient opacity
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - (distance / maxDistance)) * 0.3;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
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
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY
      };
      // Create multiple particles on mouse move
      for (let i = 0; i < 3; i++) {
        createParticle(
          e.clientX + (Math.random() - 0.5) * 40,
          e.clientY + (Math.random() - 0.5) * 40
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      mousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
      for (let i = 0; i < 3; i++) {
        createParticle(
          e.touches[0].clientX + (Math.random() - 0.5) * 40,
          e.touches[0].clientY + (Math.random() - 0.5) * 40
        );
      }
    };

    initializeActivationPoints();

    const interactiveElements = document.querySelectorAll('.interactive-particle');
    interactiveElements.forEach(element => {
      element.addEventListener('mousemove', handleMouseMove, { passive: true });
      element.addEventListener('touchmove', handleTouchMove, { passive: true });
    });

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('touchmove', handleTouchMove);
      });

      particles.forEach(particle => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
    </div>
  );
};

export default ParticleAnimation;