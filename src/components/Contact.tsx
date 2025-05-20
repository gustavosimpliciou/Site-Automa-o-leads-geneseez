import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setFormStatus('success');
      
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === formRef.current) {
              entry.target.classList.add('opacity-100', 'translate-x-0');
              entry.target.classList.remove('opacity-0', 'translate-x-[-50px]');
            } else if (entry.target === contactInfoRef.current) {
              entry.target.classList.add('opacity-100', 'translate-x-0');
              entry.target.classList.remove('opacity-0', 'translate-x-[50px]');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) observer.observe(formRef.current);
    if (contactInfoRef.current) observer.observe(contactInfoRef.current);

    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
      if (contactInfoRef.current) observer.unobserve(contactInfoRef.current);
    };
  }, []);

  return (
    <section id="contact" className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Entre em Contato</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div 
            ref={formRef}
            className="bg-white p-8 rounded-lg shadow-md transition-all duration-1000 opacity-0 translate-x-[-50px]"
          >
            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold mb-4">Obrigado!</h3>
                <p className="text-gray-700 mb-6">Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="bg-black text-white font-medium py-3 px-8 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-6">Envie uma Mensagem</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors ${
                      formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {formStatus === 'submitting' ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </form>
              </>
            )}
          </div>
          
          <div 
            ref={contactInfoRef}
            className="transition-all duration-1000 opacity-0 translate-x-[50px]"
          >
            <div className="bg-white p-8 rounded-lg shadow-md h-full">
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail size={24} className="text-black mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a href="mailto:info@genessez.com" className="text-gray-700 hover:text-black transition-colors">
                      info@genessez.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone size={24} className="text-black mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Telefone</p>
                    <a href="tel:+11234567890" className="text-gray-700 hover:text-black transition-colors">
                      +1 (123) 456-7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={24} className="text-black mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Endereço</p>
                    <address className="text-gray-700 not-italic">
                      Rua da Automação, 123<br />
                      Distrito Tecnológico<br />
                      São Paulo, SP 04538-133
                    </address>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold mb-4">Horário de Funcionamento</h4>
                <p className="text-gray-700 mb-2">Segunda - Sexta: 9:00 - 18:00</p>
                <p className="text-gray-700">Sábado - Domingo: Fechado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;