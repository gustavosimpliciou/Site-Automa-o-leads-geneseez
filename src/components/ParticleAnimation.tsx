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

const ParticleAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const isInteractingRef = useRef(false);
  const lastParticleTimeRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    const particles = particlesRef.current;
    const maxParticles = 30;
    const maxDistance = 150;
    const fadeTime = 800;
    const particleInterval = 40;

    let width: number;
    let height: number;

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth * window.devicePixelRatio;
      height = canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
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
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.opacity = 0.9;
        this.size = Math.random() * 4 + 3;
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
        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -0.8;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -0.8;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.element.style.opacity = String(this.opacity);
      }
    }

    const createParticle = (x: number, y: number) => {
      const now = Date.now();
      
      if (now - lastParticleTimeRef.current > particleInterval) {
        if (particles.length < maxParticles) {
          particles.push(new ParticleClass(x, y));
        } else {
          const particle = particles.shift();
          if (particle) {
            particle.x = x;
            particle.y = y;
            particle.opacity = 0.9;
            particle.createdAt = now;
            particle.vx = (Math.random() - 0.5) * 2;
            particle.vy = (Math.random() - 0.5) * 2;
            particle.size = Math.random() * 4 + 3;
            particle.element.style.width = `${particle.size}px`;
            particle.element.style.height = `${particle.size}px`;
            particle.updatePosition();
            particles.push(particle);
          }
        }
        lastParticleTimeRef.current = now;
      }
    };

    const drawConnections = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);
      const now = Date.now();

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        if (now - particle.createdAt > fadeTime) {
          particle.opacity = Math.max(0, particle.opacity - 0.02);
          if (particle.opacity <= 0) {
            container.removeChild(particle.element);
            particles.splice(i, 1);
            continue;
          }
        }
        particle.updatePosition();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            const lineWidth = 0.5 + opacity * 1.5;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (isInteractingRef.current) {
        drawConnections();
      } else {
        if (ctx) ctx.clearRect(0, 0, width, height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i];
          particle.opacity = Math.max(0, particle.opacity - 0.02);
          if (particle.opacity <= 0) {
            container.removeChild(particle.element);
            particles.splice(i, 1);
            continue;
          }
          particle.updatePosition();
        }
      }
      requestAnimationFrame(animate);
    };

    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      isInteractingRef.current = true;
      createParticle(clientX, clientY);
    };

    const handleInteractionEnd = () => {
      isInteractingRef.current = false;
    };

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('.interactive-particle');
    interactiveElements.forEach(element => {
      element.addEventListener('mousemove', handleInteraction, { passive: true });
      element.addEventListener('touchmove', handleInteraction, { passive: true });
      element.addEventListener('mouseleave', handleInteractionEnd);
      element.addEventListener('touchend', handleInteractionEnd);
    });

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mousemove', handleInteraction);
        element.removeEventListener('touchmove', handleInteraction);
        element.removeEventListener('mouseleave', handleInteractionEnd);
        element.removeEventListener('touchend', handleInteractionEnd);
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