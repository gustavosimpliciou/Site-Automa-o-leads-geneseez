import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  previewUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Restaurante Sabor & Arte",
    description: "Site completo com cardápio digital e sistema de reservas",
    image: "/saborearte.JPGr",
    previewUrl: "/previews/restaurante/index.html"
  },
  {
    id: 2,
    title: "Academia FitPro",
    description: "Plataforma de agendamento de aulas e acompanhamento",
    image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg",
    previewUrl: "/previews/academia.html"
  },
  {
    id: 3,
    title: "Clínica Saúde Total",
    description: "Sistema de agendamento de consultas online",
    image: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg",
    previewUrl: "/previews/clinica.html"
  },
  {
    id: 4,
    title: "Imobiliária Lar Ideal",
    description: "Catálogo de imóveis com tour virtual",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    previewUrl: "/previews/imobiliaria.html"
  }
];

const Portfolio: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 3 ? prevIndex : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex < projects.length - 3;

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-slate-900/50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        Nossos <span className="neon-text-blue">Projetos</span> Recentes
      </h2>

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center justify-center">
          {showLeftArrow && (
            <button
              onClick={prevSlide}
              className="absolute left-4 z-10 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
            {projects.map((project, index) => {
              const isVisible = index >= currentIndex && index < currentIndex + 3;
              return isVisible && (
                <div
                  key={project.id}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {showRightArrow && (
            <button
              onClick={nextSlide}
              className="absolute right-4 z-10 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl h-[90vh] bg-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
            >
              <X size={24} />
            </button>
            <iframe
              src={selectedProject.previewUrl}
              title={selectedProject.title}
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;