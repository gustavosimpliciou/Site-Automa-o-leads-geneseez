import React from 'react';
import { Twitter, Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

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

  const contactInfo = {
    email: 'contato@geneseez.com',
    phone: '+55 11 99999-9999',
    address: {
      street: 'Rua da Automação, 123',
      district: 'Distrito Tecnológico',
      city: 'São Paulo, SP',
      postalCode: '04538-133'
    }
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <a 
              href="#home" 
              className="inline-block mb-6"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              <img 
                src="/logo2.png" 
                alt="Geneseez" 
                className="h-8"
              />
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
                ['contact', 'Contato']
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
            <h3 className="text-lg font-bold mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-2" />
                <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-white">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-gray-400 mr-2" />
                <a href={`tel:${contactInfo.phone}`} className="text-gray-400 hover:text-white">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="text-gray-400 mr-2 mt-1" />
                <address className="text-gray-400 not-italic">
                  {contactInfo.address.street}<br />
                  {contactInfo.address.district}<br />
                  {contactInfo.address.city}<br />
                  {contactInfo.address.postalCode}
                </address>
              </li>
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
            © {new Date().getFullYear()} Geneseez. Todos os direitos reservados.
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

export default Footer