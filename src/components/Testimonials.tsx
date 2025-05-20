import React, { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  content: string;
  rating: number;
}

const TestimonialCard: React.FC<{ testimonial: Testimonial; delay: number }> = ({ testimonial, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'scale-100');
              entry.target.classList.remove('opacity-0', 'scale-95');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 opacity-0 scale-95"
    >
      <div className="flex mb-4">
        {Array(5).fill(null).map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={i < testimonial.rating ? "text-black fill-current" : "text-gray-300"}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
      <div>
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-gray-600 text-sm">{testimonial.company}</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechCorp",
      content: "A Genessez transformou nosso fluxo de trabalho com suas soluções de automação n8n. Vimos um aumento dramático na eficiência e nossa equipe agora pode focar em tarefas mais estratégicas.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Global Finance",
      content: "O sistema de processamento de notas fiscais que a Genessez implementou revolucionou nosso departamento contábil. O que costumava levar dias agora acontece automaticamente em minutos.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      company: "HealthPlus",
      content: "Trabalhar com a Genessez foi perfeito do início ao fim. A equipe deles entendeu nossas necessidades complexas e entregou uma solução que superou nossas expectativas.",
      rating: 4
    },
    {
      id: 4,
      name: "David Kim",
      company: "Retail Solutions",
      content: "O atendimento ao cliente na Genessez é excepcional. Eles são ágeis, conhecedores e realmente se importam em ajudar nosso negócio a ter sucesso através da automação.",
      rating: 5
    },
    {
      id: 5,
      name: "Olivia Taylor",
      company: "MarketBoost",
      content: "Após implementar a solução de automação de marketing da Genessez, vimos um aumento de 35% nas taxas de conversão. A expertise deles com n8n é incomparável.",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const endIndex = currentIndex + itemsPerPage;
    setVisibleTestimonials(testimonials.slice(currentIndex, endIndex));
  }, [currentIndex, itemsPerPage]);

  const nextSlide = () => {
    const newIndex = currentIndex + itemsPerPage;
    if (newIndex < testimonials.length) {
      setCurrentIndex(newIndex);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    const newIndex = currentIndex - itemsPerPage;
    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    } else {
      setCurrentIndex(Math.max(0, testimonials.length - itemsPerPage));
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">O que Nossos Clientes Dizem</h2>
        
        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold">Depoimentos de Clientes</h3>
            <div className="flex space-x-2">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Depoimentos anteriores"
              >
                <ChevronLeft size={20} className="text-black" />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Próximos depoimentos"
              >
                <ChevronRight size={20} className="text-black" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;