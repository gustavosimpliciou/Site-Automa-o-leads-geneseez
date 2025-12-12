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
    { icon: Music, title: 'MÚSICA', desc: 'PRODUÇÃO MUSICAL COMPLETA' },
    { icon: Palette, title: 'ARTE & DESIGN', desc: 'IDENTIDADE VISUAL ÚNICA' },
    { icon: Video, title: 'VÍDEO', desc: 'NARRATIVAS AUDIOVISUAIS' },
    { icon: Camera, title: 'FOTOGRAFIA', desc: 'MOMENTOS ETERNIZADOS' },
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
            <p className="text-gray-700 mb-6 leading-relaxed uppercase">
              <strong>GENESEEZ</strong> NASCE DA PALAVRA GENESIS - O INÍCIO DE TUDO. SOMOS UM COLETIVO CRIATIVO 
              QUE ACREDITA QUE CADA IDEIA MERECE GANHAR VIDA. NÃO SEGUIMOS TENDÊNCIAS; CRIAMOS CAMINHOS.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed uppercase">
              NASCEMOS DA VONTADE DE FAZER DIFERENTE. DE DAR VOZ A QUEM TEM ALGO A DIZER. 
              DE TRANSFORMAR SONHOS EM OBRAS QUE TOCAM, QUE MARCAM, QUE PERMANECEM.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed uppercase">
              CADA PROJETO QUE ABRAÇAMOS CARREGA NOSSA ESSÊNCIA: AUTENTICIDADE, DEDICAÇÃO E A BUSCA 
              INCANSÁVEL PELA EXCELÊNCIA. TRABALHAMOS COM PESSOAS, NÃO APENAS COM IDEIAS.
            </p>
            <div className="flex items-center gap-3 text-gray-500">
              <Sparkles size={20} />
              <span className="text-sm uppercase tracking-wider">CRIANDO DESDE O INÍCIO</span>
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
              <p className="text-sm leading-relaxed uppercase">
                "NÃO FAZEMOS APENAS ARTE. FAZEMOS O QUE AINDA NÃO FOI FEITO. 
                CADA CRIAÇÃO É UM PEDAÇO DE NÓS QUE ENTREGAMOS AO MUNDO."
              </p>
              <p className="text-gray-400 text-xs mt-3 uppercase tracking-wider">- EQUIPE GENESEEZ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
