import React, { useEffect, useRef } from 'react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === textRef.current) {
              entry.target.classList.add('opacity-100', 'translate-x-0');
              entry.target.classList.remove('opacity-0', 'translate-x-[-50px]');
            } else if (entry.target === imageRef.current) {
              entry.target.classList.add('opacity-100', 'translate-x-0');
              entry.target.classList.remove('opacity-0', 'translate-x-[50px]');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            className="transition-all duration-1000 opacity-0 translate-x-[-50px]" 
            ref={textRef}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Quem Somos</h2>
            <p className="text-gray-700 mb-6">
              A Geneseez é uma empresa dedicada à criação de soluções avançadas de automação e ideias inovadoras para processos empresariais em diversos setores. Oferecemos a melhor experiência de atendimento ao cliente através da automação de ponta alimentada pela plataforma n8n.
            </p>
            <p className="text-gray-700 mb-6">
              Nossa equipe de especialistas trabalha em estreita colaboração com os clientes para entender suas necessidades específicas e desenvolver soluções de automação personalizadas que otimizam operações, reduzem tarefas manuais e melhoram a eficiência geral.
            </p>
            <p className="text-gray-700">
              Acreditamos no poder da automação para transformar negócios e impulsionar o crescimento. Com a Geneseez, você não está apenas contratando um fornecedor de serviços – está ganhando um parceiro estratégico comprometido com seu sucesso.
            </p>
          </div>
          <div 
            className="transition-all duration-1000 opacity-0 translate-x-[50px]" 
            ref={imageRef}
          >
            <div className="bg-gray-100 rounded-lg p-8 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-black rounded-full flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Soluções Inovadoras</h3>
                <p className="text-gray-600">
                  Utilizamos as mais recentes tecnologias e metodologias para entregar soluções de automação de ponta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;