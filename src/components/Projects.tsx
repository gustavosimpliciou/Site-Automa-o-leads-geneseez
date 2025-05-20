import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Projects: React.FC = () => {
  const projectsData: Project[] = [
    {
      id: 1,
      title: "Automação de CRM",
      description: "Automatizamos fluxos de trabalho de CRM para um cliente do varejo usando n8n, resultando em redução de 40% na entrada manual de dados.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      title: "Processamento de Notas Fiscais",
      description: "Desenvolvemos um sistema automatizado de processamento de notas fiscais para uma empresa de serviços financeiros, reduzindo o tempo de processamento em 75%.",
      image: "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      title: "Integração de Dados",
      description: "Criamos integração perfeita de dados entre múltiplas plataformas para um provedor de saúde, permitindo sincronização de dados em tempo real.",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 4,
      title: "Automação de Marketing",
      description: "Construímos um sistema abrangente de automação de marketing para um e-commerce, aumentando a eficiência das campanhas em 60%.",
      image: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

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
    setVisibleProjects(projectsData.slice(currentIndex, endIndex));
  }, [currentIndex, itemsPerPage]);

  const nextSlide = () => {
    const newIndex = currentIndex + itemsPerPage;
    if (newIndex < projectsData.length) {
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
      setCurrentIndex(Math.max(0, projectsData.length - itemsPerPage));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      const projectCards = containerRef.current.querySelectorAll('.project-card');
      projectCards.forEach(card => observer.observe(card));
    }

    return () => {
      if (containerRef.current) {
        const projectCards = containerRef.current.querySelectorAll('.project-card');
        projectCards.forEach(card => observer.unobserve(card));
      }
    };
  }, [visibleProjects]);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Nossos Projetos</h2>
        
        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold">Projetos em Destaque</h3>
            <div className="flex space-x-2">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Projetos anteriores"
              >
                <ChevronLeft size={20} className="text-black" />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Próximos projetos"
              >
                <ChevronRight size={20} className="text-black" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" ref={containerRef}>
            {visibleProjects.map((project, index) => (
              <div 
                key={project.id}
                className="project-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-700 opacity-0 translate-y-10"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <button className="text-black font-medium hover:underline">Saiba Mais</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;