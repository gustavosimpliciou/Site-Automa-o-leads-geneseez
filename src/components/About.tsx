import React from 'react';
import { Cpu, Workflow, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-poppins">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Sobre a <span className="neon-text-blue">GENESEEZ IA</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Transformando Negócios com <span className="neon-text-purple">Tecnologia</span>
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Somos especialistas em criar soluções digitais que impulsionam o crescimento do seu negócio. 
              Nossa missão é tornar a tecnologia acessível e eficiente para empresas de todos os tamanhos.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center text-[#0cf] hover:text-white transition-colors duration-300"
            >
              Voltar para Home <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute top-0 right-0 w-full h-full bg-[#0cf]/20 rounded-full blur-[100px] -z-10"></div>
            <img 
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" 
              alt="Equipe trabalhando" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-800/50 p-8 rounded-xl hover:transform hover:-translate-y-2 transition-all duration-300">
            <Globe className="w-12 h-12 text-[#0cf] mb-4" />
            <h3 className="text-xl font-semibold mb-4">Sites Profissionais</h3>
            <p className="text-gray-300">
              Desenvolvemos sites modernos e responsivos que convertem visitantes em clientes, 
              com foco em experiência do usuário e performance.
            </p>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-xl hover:transform hover:-translate-y-2 transition-all duration-300">
            <Workflow className="w-12 h-12 text-[#b45afb] mb-4" />
            <h3 className="text-xl font-semibold mb-4">Automação de Processos</h3>
            <p className="text-gray-300">
              Otimizamos seus processos empresariais com automações inteligentes, 
              reduzindo custos e aumentando a produtividade.
            </p>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-xl hover:transform hover:-translate-y-2 transition-all duration-300">
            <Cpu className="w-12 h-12 text-[#0cfa83] mb-4" />
            <h3 className="text-xl font-semibold mb-4">Inteligência Artificial</h3>
            <p className="text-gray-300">
              Implementamos soluções de IA para automatizar atendimento, 
              análise de dados e tomada de decisões.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Pronto para Transformar seu Negócio?</h2>
          <Link 
            to="/" 
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#0cf] to-[#0cfa83] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#0cf]/20 transition-all duration-300"
          >
            Comece Agora <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About