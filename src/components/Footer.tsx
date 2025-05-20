import React from 'react';
import { Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <a 
              href="#home" 
              className="text-2xl font-bold tracking-tight mb-6 inline-block"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              Genessez
            </a>
            <p className="text-gray-400 mt-4">
              Capacitando empresas através de automação avançada de processos com tecnologia n8n.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Navegação</h3>
            <ul className="space-y-3">
              {[
                ['home', 'Início'],
                ['about', 'Sobre'],
                ['projects', 'Projetos'],
                ['pricing', 'Preços']
              ].map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Empresa</h3>
            <ul className="space-y-3">
              {[
                ['contact', 'Contato'],
                ['partners', 'Parceiros'],
                ['testimonials', 'Depoimentos'],
                ['review', 'Avaliações']
              ].map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Inscreva-se em nossa newsletter para receber atualizações sobre nossos serviços e as últimas tendências em automação.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Seu email"
                className="px-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none w-full"
              />
              <button
                type="submit"
                className="bg-white text-black px-4 py-2 rounded-r-md hover:bg-gray-200 transition-colors"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Genessez. Todos os direitos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors mx-3 md:ml-6 md:mr-0">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors mx-3 md:ml-6 md:mr-0">
              Termos de Serviço
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;