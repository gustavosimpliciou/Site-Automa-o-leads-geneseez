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
    { icon: Music, title: 'Musica', desc: 'Producao musical completa' },
    { icon: Palette, title: 'Arte & Design', desc: 'Identidade visual unica' },
    { icon: Video, title: 'Video', desc: 'Narrativas audiovisuais' },
    { icon: Camera, title: 'Fotografia', desc: 'Momentos eternizados' },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div 
            className="transition-all duration-1000 opacity-0 translate-x-[-50px]" 
            ref={textRef}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Quem Somos</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Geneseez</strong> nasce da palavra genesis - o inicio de tudo. Somos um coletivo criativo 
              que acredita que cada ideia merece ganhar vida. Nao seguimos tendencias; criamos caminhos.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nascemos da vontade de fazer diferente. De dar voz a quem tem algo a dizer. 
              De transformar sonhos em obras que tocam, que marcam, que permanecem.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Cada projeto que abraçamos carrega nossa essencia: autenticidade, dedicacao e a busca 
              incansavel pela excelencia. Trabalhamos com pessoas, nao apenas com ideias.
            </p>
            <div className="flex items-center gap-3 text-gray-500">
              <Sparkles size={20} />
              <span className="text-sm uppercase tracking-wider">Criando desde o inicio</span>
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
                "Nao fazemos apenas arte. Fazemos o que ainda nao foi feito. 
                Cada criacao e um pedaco de nos que entregamos ao mundo."
              </p>
              <p className="text-gray-400 text-xs mt-3 uppercase tracking-wider">- Equipe Geneseez</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
