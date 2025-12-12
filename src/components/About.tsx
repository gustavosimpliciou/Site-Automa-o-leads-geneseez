import { useEffect, useRef } from 'react';
import { Music, Palette, Video, Camera, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === textRef.current) {
              entry.target.classList.add('opacity-100', 'translate-x-0');
              entry.target.classList.remove('opacity-0', 'translate-x-[-50px]');
            } else if (entry.target === servicesRef.current) {
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
    if (servicesRef.current) observer.observe(servicesRef.current);

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      if (servicesRef.current) observer.unobserve(servicesRef.current);
    };
  }, []);

  const services = [
    { icon: Music, title: 'MÚSICA', desc: 'Produção musical completa' },
    { icon: Palette, title: 'ARTE & DESIGN', desc: 'Identidade visual única' },
    { icon: Video, title: 'VÍDEO', desc: 'Narrativas audiovisuais' },
    { icon: Camera, title: 'FOTOGRAFIA', desc: 'Momentos eternizados' },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div 
            className="transition-all duration-1000 opacity-0 translate-x-[-50px]" 
            ref={textRef}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black uppercase">QUEM SOMOS</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Geneseez</strong> nasce da palavra Genesis - o início de tudo. Somos um coletivo criativo 
              que acredita que cada ideia merece ganhar vida. Não seguimos tendências; criamos caminhos.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nascemos da vontade de fazer diferente. De dar voz a quem tem algo a dizer. 
              De transformar sonhos em obras que tocam, que marcam, que permanecem.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Cada projeto que abraçamos carrega nossa essência: autenticidade, dedicação e a busca 
              incansável pela excelência. Trabalhamos com pessoas, não apenas com ideias.
            </p>
            <div className="flex items-center gap-3 text-gray-500">
              <Sparkles size={20} />
              <span className="text-sm tracking-wider">Criando desde o início</span>
            </div>
          </div>
          <div 
            className="transition-all duration-1000 opacity-0 translate-x-[50px]" 
            ref={servicesRef}
          >
            <div className="grid grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-black">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-6 bg-black rounded-lg text-white">
              <p className="text-sm leading-relaxed">
                "Não fazemos apenas arte. Fazemos o que ainda não foi feito. 
                Cada criação é um pedaço de nós que entregamos ao mundo."
              </p>
              <p className="text-gray-400 text-xs mt-3 tracking-wider">- Equipe Geneseez</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
